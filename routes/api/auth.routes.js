import express from "express";
import {
  AuthLogin,
  AuthProfile,
  AuthRegister,
  AuthLogout,
} from "../../controller/auth.controller.js";
import {} from "../../controller/product.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";

export const app = express();

app.post("/login", AuthLogin);

app.post("/register", AuthRegister);

app.post("/logout", AuthLogout);

app.get("/profile", authRequired, AuthProfile);
