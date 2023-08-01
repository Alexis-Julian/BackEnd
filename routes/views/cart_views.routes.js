import express from "express";

import { ShowCartId } from "../../controller/views/view_cart.controller.js";

export const app = express.Router();

/* Muestra el carrito especificado */
app.get("/:cid", ShowCartId);
