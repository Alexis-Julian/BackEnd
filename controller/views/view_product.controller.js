import ProductManager from "../../logic/product_manager.js";
import AuthManager from "../../logic/auth_manager.js";
import jwt from "jsonwebtoken";

import env from "../../config/enviroment.config.js";

const ProductManagerI = new ProductManager();

const AuthManagerI = new AuthManager();

/* Esto es mal se supone que una vez adentro ya tendria informacion
del usuario */
export async function getProducts(req, res) {
  const { token } = req.cookies;

  let { id } = jwt.verify(token, env.TOKEN);
  let user = await AuthManagerI.userFound({ _id: id });

  let [product] = await ProductManagerI.getProduct(req.query);
  let producpars = product.docs;

  res.render("home", { producpars, user });
}
