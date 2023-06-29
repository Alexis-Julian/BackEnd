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
  let msg = await CartManagerI.getCart(req.params.cid);
  /* STATUS_RES_GET(msg, res); */
  res.send("123");
});

app.post("/", async (req, res) => {
  let msg = await CartManagerI.addCart();
  STATUS_RES_GET(msg, res);
});

app.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const msg = await CartManagerI.addProductCart(cid, pid, "ADD");
  res.send("123");
  /*  STATUS_RES_GET("msg", res); */
});

app.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const msg = await CartManagerI.clearProductsCart(cid);
  res.send("123");
});

app.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  let msg = await CartManagerI.addProductCart(cid, pid, "REP", req.body);
  res.send("123");
});

app.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  let msg = await CartManagerI.addProductCart(cid, pid, "SUBB");
  res.send("123");
});

app.delete("/:cid", async (req, res) => {});
