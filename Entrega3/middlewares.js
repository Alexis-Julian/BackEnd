import express from "express";
import { app as RouteProduct } from "./routes/api/products.js";

export default (app) => {
  app.use(RouteProduct);
  app.use(express.urlencoded({ extended: true }));
};
