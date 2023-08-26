import express from "express";
import { AuthLogin, AuthRegister, AuthLogout } from "../../controller/api/auth.controller.js";

export const app = express.Router();

app.post("/login", AuthLogin);

app.post("/register", AuthRegister);

app.post("/logout", AuthLogout);
