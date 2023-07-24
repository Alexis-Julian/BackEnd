import express from "express";
import { PostMsg } from "../../controller/chat.controller.js";

export const app = express.Router();

app.get("/friend", (req, res) => {
  const { token } = req.cookies;
  res.send(token);
});

app.post("/", PostMsg);
