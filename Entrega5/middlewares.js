import express from "express";
import { app as RouteProduct } from "./routes/product.js";
import { app as RouteCart } from "./routes/cart.js";
import { app as RouteProductView } from "./routes/views/views.router.js";
import { app as RouteCartView } from "./routes/views/cart_views.router.js";
import morgan from "morgan";
import { file } from "./config.js";

export default (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api/products", RouteProduct);
  app.use("/api/carts", RouteCart);
  app.use("/view/products", RouteProductView);
  app.use("/view/cart", RouteCartView);
  app.use(express.static(file + "/public"));
  app.use(express.urlencoded({ extended: true }));
};
