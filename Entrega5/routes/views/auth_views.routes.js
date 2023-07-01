import express from "express";
import {
  ViewLogin,
  ViewRegister,
} from "../../controller/view_auth.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";
export const app = express.Router();

app.get("/login", ViewLogin);

app.get("/register", ViewRegister);
