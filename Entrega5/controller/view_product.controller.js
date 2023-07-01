import ProductManager from "../logic/product_manager.js";
import AuthManager from "../logic/auth_manager.js";
import jwt from "jsonwebtoken";
import { TOKEN } from "../config.js";
const ProductManagerI = new ProductManager();
const AuthManagerI = new AuthManager();
export async function getProducts(req, res) {
  const { token } = req.cookies;
  let { id } = jwt.verify(token, TOKEN);
  let { username, role } = await AuthManagerI.userFound({ _id: id });
  let [product] = await ProductManagerI.getProduct(req.query);
  let producpars = product.docs;

  res.render("home", { producpars, username, role });
}
