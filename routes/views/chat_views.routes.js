import express from "express";
import { Chat } from "../../controller/views/view_chat.controller.js";
import { authRequired, authUser } from "../../middlewares/validateToken.js";
export const app = express.Router();

/* Muestra los chats */
app.get("/", authRequired, authUser, Chat);
