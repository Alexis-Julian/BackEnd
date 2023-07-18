import express from "express";
import { Chat } from "../../controller/view_chat.controller.js";
export const app = express.Router();

app.get("/", Chat);
