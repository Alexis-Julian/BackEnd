import express from "express";
import env from "./config/enviroment.config.js";
/* Rutas */
import { app as RouteProduct } from "./routes/api/product.routes.js";
import { app as RouteCart } from "./routes/api/cart.routes.js";
import { app as AuthUser } from "./routes/api/auth.routes.js";
import { app as RouteChat } from "./routes/api/chat.routes.js";
import { app as CookieRoute } from "./routes/api/cookie.routes.js";
import { app as RouteFriend } from "./routes/api/friends.routes.js";
import { app as RouteMockingProduct } from "./routes/api/mocking.routes.js";
import { app as LoggerTest } from "./routes/api/logtest.routes.js";
import { app as RouteSession } from "./routes/api/session.routes.js";

import { app as RouteProductView } from "./routes/views/product_views.routes.js";
import { app as RouteCartView } from "./routes/views/cart_views.routes.js";
import { app as AuthView } from "./routes/views/auth_views.routes.js";
import { app as RouteChatView } from "./routes/views/chat_views.routes.js";
/* Librerias */
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
/* Utils */
import { file } from "./config.js";
import errorHandler from "./middlewares/error.js";

const configMongoStore = {
  store: MongoStore.create({
    mongoUrl: env.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 999999,
  }),
  /* Guardar en un env */
  secret: "asd123",
  resave: false,
  saveUninitialized: false,
};

const specs = swaggerJSDoc({
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Reference",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: [`${file}/docs/**/*.yaml`],
});

export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(cors());

  app.use(session(configMongoStore));

  app.use(express.static(file + "/public"));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

  app.use("/api/user", AuthUser);
  app.use("/api/sessions", RouteSession);
  app.use("/api/chat", RouteChat);
  app.use("/api/products", RouteProduct);
  app.use("/api/carts", RouteCart);
  app.use("/api/friends", RouteFriend);
  app.use("/api/mockingproducts", RouteMockingProduct);
  app.use("/api/cookie", CookieRoute);
  app.use("/api/loggerTest", LoggerTest);

  app.use("/view/products", RouteProductView);
  app.use("/view/cart", RouteCartView);
  app.use("/view/chat", RouteChatView);
  app.use("/view/user", AuthView);

  app.use(errorHandler);
};
