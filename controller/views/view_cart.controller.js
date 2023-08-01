import CartManager from "../../logic/cart_manager.js";

const CarManagerI = new CartManager();

export async function ShowCartId() {
  /* No validado por si no existe el cart */
  let { cid } = req.params;
  const [cart] = await CartManagerI.getCart(cid);
  let cartrend = cart.products.map((e) => {
    return { product: e.product, quantity: e.quantity };
  });
  res.render("cart", { cartrend });
}
