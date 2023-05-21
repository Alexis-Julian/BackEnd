import express from "express";
import ProductManager from "../logic/ProductManager.js";
import { file } from "../config.js";
import path from "path";
import { STATUS_RES_GET } from "../utils.js";
import { io } from "../index.js";
export const app = express.Router();

const ProductManagerI = new ProductManager(
  path.join(file, "data", "products.json")
);

app.get("/", async (req, res) => {
  let { limits } = req.query;
  let products = await ProductManagerI.getProduct(limits);
  STATUS_RES_GET(products, res);
});

app.get("/:pid", async (req, res) => {
  let product = await ProductManagerI.getProductById(req.params.pid);
  STATUS_RES_GET(product, res);
});

app.post("/", async (req, res) => {
  let msg = await ProductManagerI.addProduct(await req.body);
  io.emit("newproduct", msg[0]);
  STATUS_RES_GET(msg, res);
});

app.put("/:pid", async (req, res) => {
  let msg = await ProductManagerI.updateProduct(await req.body, req.params.pid);
  STATUS_RES_GET(msg, res);
});

app.delete("/:pid", async (req, res) => {
  let msg = await ProductManagerI.deleteProduct(req.params.pid);
  STATUS_RES_GET(msg, res);
});
