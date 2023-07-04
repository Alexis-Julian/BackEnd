import CartManager from "../logic/cart_manager.js";
import { STATUS_RES_GET } from "../utils.js";
/* Instanciado de clase manipulacion de productos */
const CartManagerI = new CartManager();

/* Devuelve el carrito especificado */
export async function getCart(req, res) {
  const msg = await CartManagerI.getCart(req.params.cid);
  STATUS_RES_GET(msg, res);
}

/* Agrega un carrito nuevo <id automatica> */
export async function addCart(req, res) {
  const msg = await CartManagerI.addCart();
  STATUS_RES_GET(msg, res);
}

/* Agrega un producto a un carrito especificado */
export async function addProductCart(req, res) {
  const { cid, pid } = req.params;
  const msg = await CartManagerI.addProductCart(cid, pid, "ADD");
  STATUS_RES_GET(msg, res);
}

/* Elimina todos los productos del carrito id especificado */
export async function ClearProductCart(req, res) {
  const { cid } = req.params;
  const msg = await CartManagerI.clearProductsCart(cid);
  STATUS_RES_GET(msg, res);
}

/* Modifica la cantidad de un producto especificado y un carrito especificado  */
export async function UpdateProductCart(req, res) {
  const { cid, pid } = req.params;
  let msg = await CartManagerI.addProductCart(cid, pid, "REP", req.body);
  STATUS_RES_GET(msg, res);
}

/* Elimina la cantidad en uno de un producto */
export async function DeleteOneQuantity(req, res) {
  const { cid, pid } = req.params;
  let msg = await CartManagerI.addProductCart(cid, pid, "SUBB");
  STATUS_RES_GET(msg, res);
}
