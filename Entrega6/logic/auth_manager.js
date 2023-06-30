import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { createToken } from "../libs/jwt.js";
import { STATUS_TYPES } from "../utils.js";
export default class AuthManager {
  async Encrypt(password) {
    return await bcrypt.hash(password, 10);
  }
  async passHash(password, passwordb) {
    return await bcrypt.compare(password, passwordb);
  }
  async userFound(email) {
    let userFound = await userModel.findOne({ email: email });
    return userFound;
  }
  async loginUser({ email, password }, callback) {
    /* Validacion email */
    let user = await this.userFound(email);
    if (!user) return ["User not found", STATUS_TYPES.WARNING];
    /* Validacion contraseña */
    let passhash = await this.passHash(password, user.password);
    if (!passhash) return ["Password incorrect", STATUS_TYPES.WARNING];
    /* Creacion de token */
    let token = await createToken({ id: user._id });
    callback(token);
    return [token, STATUS_TYPES.INFO];
  }
  async addUser({ email, password, username }, callback) {
    /* Verificacion si el user existe */
    const userFound = await this.userFound(email);
    if (!!userFound) return ["User already exists", STATUS_TYPES.WARNING];
    /* Encriptado de la contraseña */
    let passencrypt = await this.Encrypt(password);
    /* Envio a la db */
    let newUser = new userModel({
      email,
      username,
      password: passencrypt,
    });
    await newUser.save();
    /* Creacion del token */
    let token = await createToken({ id: newUser._id });
    callback(token);
    return [token, STATUS_TYPES.INFO];
  }
}
