import express from "express";
import { ViewLogin, ViewRegister, ViewRecover, ChangePassword } from "../../controller/views/view_auth.controller.js";
import { authPassword } from "../../middlewares/validateToken.js";
export const app = express.Router();

app.get("/login", ViewLogin);

app.get("/register", ViewRegister);

app.get("/recover", ViewRecover);

app.get("/password/:token", authPassword, ChangePassword);
