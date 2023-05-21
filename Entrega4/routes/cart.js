import express from "express";
import CartManager from "../logic/CartManager.js";
import ProductManager from "../logic/ProductManager.js";
import { file } from "../config.js";
import { STATUS_RES_GET } from "../utils.js";
import path from "path";

export const app = express.Router();

const CartManagerI = new CartManager(path.join(file, "data", "cart.json"));

const ProductManagerI = new ProductManager(
  path.join(file, "data", "products.json")
);

app.get("/:cid", async (req, res) => {
  let msg = await CartManagerI.ProductManagerC.getProductById(req.params.cid);
  STATUS_RES_GET(msg, res);
});

app.post("/", async (req, res) => {
  let msg = await CartManagerI.ProductManagerC.addProduct({ products: [] });
  STATUS_RES_GET(msg, res);
});
app.post("/:cid/product/:pid", async (req, res) => {
  const msg = await CartManagerI.addProductCart(
    req.params.cid,
    await ProductManagerI.getProductById(req.params.pid)
  );
  console.log(msg);
  STATUS_RES_GET(msg, res);
});
