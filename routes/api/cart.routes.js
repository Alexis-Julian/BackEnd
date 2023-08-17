import express from "express";
import { getCart, addCart, addProductCart, ClearProductCart, UpdateProductCart, DeleteOneQuantity, Purchase } from "../../controller/api/cart.controller.js";

export const app = express.Router();

/* Devuelve el carrito especificado */
app.get("/:cid", getCart);

/* Agrega un carrito nuevo <id automatica> */
app.post("/", addCart);

/* Agrega un producto a un carrito especificado */
app.post("/:cid/product/:pid", addProductCart);

/* Elimina todos los productos del carrito */
app.put("/:cid", ClearProductCart);

/* Modifica la cantidad de un producto especificado y un carrito especificado  */
app.put("/:cid/product/:pid", UpdateProductCart);

/* Elimina la cantidad en uno de un producto */
app.delete("/:cid/product/:pid", DeleteOneQuantity);

/* Procso de compra de los productos */
app.post("/:cid/purchase", Purchase);
