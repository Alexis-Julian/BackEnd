import ProductManager from "../../services/product.service.js";
import { ControllerError } from "../../utils.js";

/* Instancia de la clase */
const ProductManagerI = new ProductManager();

/* Trae los productos sus querys son limit: "Number" , page: "Number", query: "string", sort: "string" */
export async function getProducts(req, res) {
  let result = await ProductManagerI.getProduct(req.query);

  ControllerError(result, res);
}

/* Trae un producto por id especificada */
export async function getProductById(req, res) {
  let result = await ProductManagerI.getProductById(req.params.pid);

  ControllerError(result, res);
}

/* Añade un producto por body  */
export async function addProduct(req, res) {
  let result = await ProductManagerI.addProduct(req.body);

  ControllerError(result, res);
}

/* Modifica un producto por body ,id especificada */
export async function UpdateProduct(req, res) {
  console.log(req.body);
  let result = await ProductManagerI.updateProduct(req.body, req.params.pid);

  ControllerError(result, res);
}

/* Elimina un producto por id especificada */
export async function Removeproduct(req, res) {
  let result = await ProductManagerI.deleteProduct(req.params.pid);

  ControllerError(result, res);
}
