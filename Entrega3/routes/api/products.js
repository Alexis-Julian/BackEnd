import express from "express";
import ProductManager from "../../logic/ProductManager.js";
import { file } from "../../config.js";
export const app = express.Router();
import path from "path";

const ProductManagerI = new ProductManager(
  path.join(file, "data", "products.json")
);

app.get("/products", async (req, res) => {
  let products = await ProductManagerI.getProduct();
  let { limits } = req.query;
  limits = parseInt(limits);
  limits ? (products = products.slice(0, limits)) : (products = products);

  return res.status(200).send(products);
});
app.get("/products/:pid", async (req, res) => {
  let data = req.params.pid;
  let product = await ProductManagerI.getProductById(data);
  res.send(product);
});
