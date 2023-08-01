import ProductManager from "../../logic/product_manager.js";
import { STATUS_RES_GET } from "../../utils.js";
import { io } from "../../index.js";

/* Instancia de la clase */
const ProductManagerI = new ProductManager();

/* Trae los productos sus querys son 
    limit: "Number" , page: "Number", 
    query: "string", sort: "string" 
*/
export async function getProducts(req, res) {
  let products = await ProductManagerI.getProduct(req.query);
  STATUS_RES_GET(products, res);
}

/* Trae un producto por id especificada */
export async function getProductById(req, res) {
  let product = await ProductManagerI.getProductById(req.params.pid);
  STATUS_RES_GET(product, res);
}

/* Añade un producto por body  */
export async function addProduct(req, res) {
  let msg = await ProductManagerI.addProduct(await req.body);
  /* io.emit("product", msg); */
  STATUS_RES_GET(msg, res);
}

/* Modifica un producto por body ,id especificada */
export async function UpdateProduct(req, res) {
  let msg = await ProductManagerI.updateProduct(await req.body, req.params.pid);
  STATUS_RES_GET(msg, res);
}

/* Elimina un producto por id especificada */
export async function Removeproduct(req, res) {
  let msg = await ProductManagerI.deleteProduct(req.params.pid);
  STATUS_RES_GET(msg, res);
}
