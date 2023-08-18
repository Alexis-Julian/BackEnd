import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt.js";
import { Auth as AuthFactory, Cart as CartFactory } from "../dao/factory.js";

let AuthFactoryI = new AuthFactory();
let CartFactoryI = new CartFactory();

export default class AuthManager {
  async loginUser(user, callback) {
    /* Verificia si el usuario enviado es admin */
    const isAdmin = AuthFactoryI.UserIsAdmin(user);

    if (isAdmin) {
      let token = await createToken({ id: "admin" });
      callback(token);
      return token;
    }
    /* Fetching al usuario con email especificado */

    let userfetch = await AuthFactoryI.UserFoundByEmail(user.email);

    if (!userfetch) return null;
    /* Hash de la contraseña */
    let passhash = await passHash(user.password, userfetch.password);
    if (!passhash) return null;

    /* Creacion del token */
    let token = await createToken({ id: userfetch._id });

    callback(token, userfetch.cart);
    return token;
  }

  async addUser(user, callback) {
    /* Verificacion si el user existe */
    let email = await AuthFactoryI.UserFoundByEmail(user.email);

    if (email) {
      console.log("Email already exists");
      return null;
    }

    let passencrypt = await Encrypt(user.password);

    let cart = await CartFactoryI.addCart();

    user = { ...user, password: passencrypt, cart: cart._id };

    user = await AuthFactoryI.addUser(user);

    if (!user) return null;

    let token = await createToken({ id: user._id });

    callback(token, cart._id);

    return token;
  }
}

async function Encrypt(password) {
  return await bcrypt.hash(password, 10);
}

async function passHash(password, passwordb) {
  return await bcrypt.compare(password, passwordb);
}
