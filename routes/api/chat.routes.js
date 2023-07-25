import express from "express";
import { PostMsg } from "../../controller/chat.controller.js";
import chatModel from "../../models/chat.model.js";
export const app = express.Router();

app.post("/createchat",(req,res)=>{
  /* Sin validar que el chat no pueda funcionar */

  const chatid = new chatModel()

  res.send(chatid)
})

app.post("/postmsg", (req,res)=>{
  const {sender,recipient,body} = req.body;
  res.send("Nice")
});
