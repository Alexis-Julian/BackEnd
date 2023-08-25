import CartManager from "../../services/cart.service.js";
import { ControllerError } from "../../utils.js";
import jwt from "jsonwebtoken";
import env from "../../config/enviroment.config.js";
/* Instanciado de clase manipulacion de productos */
const CartManagerI = new CartManager();

/* Devuelve el carrito especificado */
export async function getCart(req, res) {
  const result = await CartManagerI.getCart(req.params.cid);

  ControllerError(result, res);
}

/* Agrega un carrito nuevo <id automatica> */
export async function addCart(req, res) {
  const result = await CartManagerI.addCart();

  ControllerError(result, res);
}

/* Agrega un producto a un carrito especificado */
export async function addProductCart(req, res) {
  const { pid } = req.params;

  const cid = req.session.passport.cart;

  const { q } = req.query;

  const result = await CartManagerI.addProductCart(cid, pid, "ADD", 1 || q);

  ControllerError(result, res);
}

/* Elimina todos los productos del carrito id especificado */
export async function ClearProductCart(req, res) {
  const { cid } = req.params;

  const result = await CartManagerI.clearProductsCart(cid);

  ControllerError(result, res);
}

/* Modifica la cantidad de un producto especificado y un carrito especificado  */
export async function UpdateProductCart(req, res) {
  const { cid, pid } = req.params;

  let result = await CartManagerI.addProductCart(cid, pid, "REP", req.body);

  ControllerError(result, res);
}

/* Elimina la cantidad en uno de un producto */
export async function DeleteOneQuantity(req, res) {
  const { cid, pid } = req.params;

  let msg = await CartManagerI.addProductCart(cid, pid, "SUBB");

  STATUS_RES_GET(msg, res);
}

export async function Purchase(req, res) {
  let { cid } = req.params;

  let result = await CartManagerI.PurchaseCart(cid);

  ControllerError(result, res);
}
