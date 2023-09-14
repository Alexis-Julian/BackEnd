import jwt from "jsonwebtoken";
import env from "../config/enviroment.config.js";
/* Funcion que crea tokens payload espera un objeto*/
export function createToken(payload, expire) {
  /* Expire : 1hs : 1h , 1day: 1d */
  return new Promise((resolve, reject) => {
    jwt.sign(payload, env.TOKEN, { expiresIn: expire }, (e, token) => {
      if (e) reject(e);
      resolve(token);
    });
  });
}
