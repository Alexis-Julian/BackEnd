import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  UpdateProduct,
  Removeproduct,
} from "../../controller/product.controller.js";
export const app = express.Router();

/* Trae los productos sus querys son 
    limit: "Number" , page: "Number", 
    query: "string", sort: "string" 
*/
app.get("/", getProducts);

/* Trae un producto por id especificada */
app.get("/:pid", getProductById);

/* Añade un producto por body  */
app.post("/", addProduct);

/* Modifica un producto por body ,id especificada */
app.put("/:pid", UpdateProduct);

/* Elimina un producto por id especificada */
app.get("/:pid", Removeproduct);
