import express from "express";
import { AuthLogin, AuthRegister, AuthLogout, AuthRecovery } from "../../controller/api/auth.controller.js";

export const app = express.Router();

app.post("/login", AuthLogin);

app.post("/register", AuthRegister);

app.put("/recover/:email", AuthRecovery);

app.post("/logout", AuthLogout);
