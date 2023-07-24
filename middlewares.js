import express from "express";
import { connectMongoDb } from "./db.js";

/* --------------Rutas---------------- */
import { app as RouteProduct } from "./routes/api/product.routes.js";
import { app as RouteCart } from "./routes/api/cart.routes.js";
import { app as AuthUser } from "./routes/api/auth.routes.js";
import { app as RouteChat } from "./routes/api/chat.routes.js";
import { app as CookieRoute } from "./routes/api/cookie.routes.js";
import { app as RouteProductView } from "./routes/views/product_views.routes.js";
import { app as RouteCartView } from "./routes/views/cart_views.routes.js";
import { app as AuthView } from "./routes/views/auth_views.routes.js";
import { app as RouteSession } from "./routes/api/session.routes.js";
import { app as RouteChatView } from "./routes/views/chat_views.routes.js";
/* ---------- 0 -------------------- */
import passport from "passport";
import cookieParser from "cookie-parser";
/*  */
import session from "express-session";
import MongoStore from "connect-mongo";
/*  */
import morgan from "morgan";
/*  */
import { file } from "./config.js";

export default (app) => {
  /* app.use(morgan("dev")); */
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          "mongodb+srv://Buzzar:ywSH2yEkcHVkUo42@cluster0.031b0cm.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,
      }),
      secret: "asd123",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use("/api/user", AuthUser);
  app.use("/api/sessions", RouteSession);
  app.use("/api/chat", RouteChat);
  app.use("/api/products", RouteProduct);
  app.use("/api/carts", RouteCart);
  app.use("/api/cookie", CookieRoute);
  app.use("/view/products", RouteProductView);
  app.use("/view/cart", RouteCartView);
  app.use("/view/chat", RouteChatView);
  app.use("/view/user", AuthView);
  app.use(express.static(file + "/public"));
  app.use(express.urlencoded({ extended: true }));
};
