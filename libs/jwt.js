import jwt from "jsonwebtoken";
import env from "../config/enviroment.config.js";
/* Funcion que crea tokens payload espera un objeto*/
export function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, env.TOKEN, { expiresIn: "1d" }, (e, token) => {
      if (e) reject(e);
      resolve(token);
    });
  });
}
