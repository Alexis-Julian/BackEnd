import express from "express";
import { getProducts } from "../../controller/view_product.controller.js";
export const app = express.Router();

/* Visualiza todo los productos */
app.get("/", getProducts);

/* Visualiza todo los productos en tiempo real */
app.get("/realtimeproducts", getProducts);
