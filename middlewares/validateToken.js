import jwt from "jsonwebtoken";
import env from "../config/enviroment.config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not have token, access disabled ", status: 401 });
  jwt.verify(token, env.TOKEN, (err, token) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.id = token;
    next();
  });
};

export const authUser = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, env.TOKEN, (err, token) => {
    if (token.id == "admin") return res.status(401).json({ message: "You are an admin and do not have permission to chat", status: 401 });
    req.id = token;
    next();
  });
};
