import express from "express";
import {
  AuthLogin,
  AuthProfile,
  AuthRegister,
  AuthLogout,
} from "../../controller/auth.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";

export const app = express.Router();

app.post("/login", AuthLogin);

app.post("/register", AuthRegister);

app.post("/logout", AuthLogout);

/* Este no anda */
/* app.get("/profile", authRequired, AuthProfile); */
