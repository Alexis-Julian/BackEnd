import express from "express";
import { app as RouteProduct } from "./routes/api/product.routes.js";
import { app as RouteCart } from "./routes/api/cart.routes.js";
import { app as AuthUser } from "./routes/api/auth.routes.js";
import { app as RouteProductView } from "./routes/views/product_views.routes.js";
import { app as RouteCartView } from "./routes/views/cart_views.routes.js";
import { app as AuthView } from "./routes/views/auth_views.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import { file } from "./config.js";

export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
  app.use("/api/user", AuthUser);
  app.use("/api/products", RouteProduct);
  app.use("/api/carts", RouteCart);
  app.use("/view/products", RouteProductView);
  app.use("/view/cart", RouteCartView);
  app.use("/view/user", AuthView);
  app.use(express.static(file + "/public"));
  app.use(express.urlencoded({ extended: true }));
};
