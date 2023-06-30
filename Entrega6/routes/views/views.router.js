import express from "express";
import ProductManager from "../../logic/ProductManager.js";
import { FormatingRender } from "../../utils.js";
export const app = express.Router();

const ProductManagerI = new ProductManager();

app.get("/", async (req, res) => {
  let [product] = await ProductManagerI.getProduct(req.query);
  /* let producpars = FormatingRender(product.docs); */
  let producpars = product.docs;
  res.render("home", { producpars });
});

app.get("/realtimeproducts", async (req, res) => {
  let [product] = await ProductManagerI.getProduct();
  product = FormatingRender(product);
  res.render("realtimeproducts", { product });
});
