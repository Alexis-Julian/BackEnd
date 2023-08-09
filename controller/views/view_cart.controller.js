import CartManager from "../../services/cart_manager.js";

const CartManagerI = new CartManager();

export async function ShowCartId(req, res) {
  /* No validado por si no existe el cart */
  let { cid } = req.params;

  const [cart] = await CartManagerI.getCart(cid);

  /* Dejo esta logica provisional porque le voy agregar Tailwind */
  let cartrend = cart.products.map((e) => {
    return { product: e.product, quantity: e.quantity };
  });

  res.render("cart", { cartrend });
}
