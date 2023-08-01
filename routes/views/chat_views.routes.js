import express from "express";
import { Chat } from "../../controller/views/view_chat.controller.js";
export const app = express.Router();

/* Muestra los chats */
app.get("/", Chat);
