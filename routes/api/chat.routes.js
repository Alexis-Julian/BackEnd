import express from "express";
import { PostMsg, CreateChat } from "../../controller/api/chat.controller.js";

export const app = express.Router();

/* Ruta para crear el chat */
app.post("/createchat", CreateChat);

/* Ruta para enviar mensajes al chat creado por la rusta /createchat */
app.post("/postmsg", PostMsg);
