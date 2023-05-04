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
  if (limits) {
    res.send(products.slice(0, limits));
  } else {
    res.send(products);
  }
});
app.get("/products/:id", async (req, res) => {
  let id;
  id = parseInt(req.params.id);
  let product = await ProductManagerI.getProductById(id);
  res.send(product);
});
