import ProductManager from "../logic/product_manager.js";
import AuthManager from "../logic/auth_manager.js";
import jwt from "jsonwebtoken";
import { userAdmin } from "../config.js";
import { TOKEN } from "../config.js";
const ProductManagerI = new ProductManager();
const AuthManagerI = new AuthManager();
export async function getProducts(req, res) {
  let user;
  const { token } = req.cookies;
  let { id } = jwt.verify(token, TOKEN);
  if(id != "admin"){
    let data = await AuthManagerI.userFound({ _id: id });
     user = {
      username: data.username,
      email: data.email,
      role: data.role,
      img: data.img,
    };
  }else{
    user={
      username:userAdmin.username,
      email:userAdmin.email,
      role:userAdmin.role,
    }
  }
  let [product] = await ProductManagerI.getProduct(req.query);
  let producpars = product.docs;

  res.render("home", { producpars, user });
}
