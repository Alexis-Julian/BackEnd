import express from "express";
import { PostMsg, CreateChat } from "../../controller/chat.controller.js";
import chatModel from "../../models/chat.model.js";
import userModel from "../../models/user.model.js";
export const app = express.Router();

app.post("/createchat", CreateChat);

app.post("/postmsg", (req, res) => {
  const { sender, recipient, body } = req.body;
  res.send("Nice");
});
