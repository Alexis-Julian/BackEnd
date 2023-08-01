import express from "express";
import {
  ViewLogin,
  ViewRegister,
} from "../../controller/views/view_auth.controller.js";
export const app = express.Router();

app.get("/login", ViewLogin);

app.get("/register", ViewRegister);
