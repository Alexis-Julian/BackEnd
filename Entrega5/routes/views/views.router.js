import express from "express";
import ProductManager from "../../logic/ProductManager.js";
import { FormatingRender } from "../../utils.js";
import { file } from "../../config.js";
import path from "path";
import { SocketIo } from "../../sockets.js";
export const app = express.Router();

const ProductManagerI = new ProductManager(
  path.join(file, "data", "products.json")
);

app.get("/", async (req, res) => {
  let [product] = await ProductManagerI.getProduct();
  product = FormatingRender(product);
  res.render("home", { product });
});

app.get("/realtimeproducts", async (req, res) => {
  let [product] = await ProductManagerI.getProduct();
  product = FormatingRender(product);
  res.render("realtimeproducts", { product });
});
