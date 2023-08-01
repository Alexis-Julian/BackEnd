import express from "express";
import { getProducts } from "../../controller/views/view_product.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";
export const app = express.Router();

/* Visualiza todo los productos */
app.get("/", authRequired, getProducts);

/* Visualiza todo los productos en tiempo real */
app.get("/realtimeproducts", getProducts);
