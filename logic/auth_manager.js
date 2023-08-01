import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { createToken } from "../libs/jwt.js";
import { STATUS_TYPES } from "../utils.js";
import env from "../config/enviroment.config.js";

export default class AuthManager {
  async Encrypt(password) {
    return await bcrypt.hash(password, 10);
  }
  async passHash(password, passwordb) {
    return await bcrypt.compare(password, passwordb);
  }
  /* Payload {email:email} */
  async userFound(payload) {
    let userFound;

    try {
      userFound = await userModel.findOne(payload).catch((e) => {
        throw new Error("User not found");
      });
    } catch (e) {
      console.log(`Error:${e}`);
    }
    return userFound;
  }
  async loginUser({ email, password }, callback) {
    /* Validacion email */

    try {
      if (email == env.ADMIN.email) throw new Error("Is Admin");

      let user = await this.userFound({ email: email });
      if (!user) return ["User not found", STATUS_TYPES.WARNING];
      /* Validacion contraseña */

      let passhash = await this.passHash(password, user.password);
      if (!passhash) return ["Password incorrect", STATUS_TYPES.WARNING];

      /* Creacion de token */
      let token = await createToken({ id: user._id });
      callback(token);
      return [token, STATUS_TYPES.INFO];
    } catch (e) {
      console.log("Error: " + e.message);
      if (e.message == "Is Admin") {
        let id = "admin";
        let token = await createToken({ id: id });
        callback(token);
        return [token, STATUS_TYPES.INFO];
      }
    }
  }

  async addUser({ email, password, username, img }, callback) {
    /* Verificacion si el user existe */
    /* --- */
    const userFound = await this.userFound({ email: email });

    if (!!userFound) return ["User already exists", STATUS_TYPES.WARNING];
    /* Encriptado de la contraseña */
    let passencrypt = await this.Encrypt(password);

    /* Envio a la db */
    let newUser = new userModel({
      email,
      username,
      password: passencrypt,
      role: "usuario",
      img: img,
    });
    await newUser.save();
    /* Creacion del token */
    let token = await createToken({ id: newUser._id });
    callback(token);
    return [token, STATUS_TYPES.INFO];
  }
}
