import ChatManager from "../../services/chat_manager.js";
import { ControllerError } from "../../utils.js";
import jwt from "jsonwebtoken";
import env from "../../config/enviroment.config.js";
const ChatManagerI = new ChatManager();

export function PostMsg(req, res) {
  const { sender, recipient, body } = req.body;

  res.send("Nice");
}

export async function CreateChat(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let { idfriend } = req.body;

  let result = await ChatManagerI.CreateChat(id, idfriend);

  ControllerError(result, res);
}

export async function getChat(req, res) {
  let result = await ChatManagerI.getChat(req.params.chatid);
  ControllerError(result, res);
}
