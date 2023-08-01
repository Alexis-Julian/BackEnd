import jwt from "jsonwebtoken";
import env from "../config/enviroment.config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Not have token, access disabled " });
  jwt.verify(token, env.TOKEN, (err, token) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.id = token;
    next();
  });
};
