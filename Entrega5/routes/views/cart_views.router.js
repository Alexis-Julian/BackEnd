import express from "express";
import CartManager from "../../logic/CartManager.js";
export const app = express.Router();

const CartManagerI = new CartManager();
app.get("/:cid", async (req, res) => {
  /* No validado por si no existe el cart */
  let { cid } = req.params;
  const [cart] = await CartManagerI.getCart(cid);
  let cartrend = cart.products.map((e) => {
    return { product: e.product, quantity: e.quantity };
  });
  res.render("cart", { cartrend });
});
