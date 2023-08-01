import ProductManager from "../../logic/product_manager.js";
import AuthManager from "../../logic/auth_manager.js";
import jwt from "jsonwebtoken";
import { userAdmin } from "../../config.js";
import { TOKEN } from "../../config.js";

const ProductManagerI = new ProductManager();
const AuthManagerI = new AuthManager();
export async function getProducts(req, res) {
  let user;

  const { token } = req.cookies;
  let { id } = jwt.verify(token, TOKEN);

  if (id != "admin") {
    let data = await AuthManagerI.userFound({ _id: id });
    user = {
      username: data.username,
      email: data.email,
      role: data.role,
      img:
        data.img ||
        "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067?s=fit&w=720&h=720",
    };
  } else {
    user = {
      username: userAdmin.username,
      email: userAdmin.email,
      role: userAdmin.role,
    };
  }

  let [product] = await ProductManagerI.getProduct(req.query);
  let producpars = product.docs;

  res.render("home", { producpars, user });
}
