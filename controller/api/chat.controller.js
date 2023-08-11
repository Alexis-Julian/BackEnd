import ChatManager from "../../services/chat_manager.js";
import { ControllerError } from "../../utils.js";
import jwt from "jsonwebtoken";
import env from "../../config/enviroment.config.js";
import MsgDTO from "../../services/DTOs/msg.dto.js";
import ChatDTO from "../../services/DTOs/chat.dto.js";
const ChatManagerI = new ChatManager();

export async function PostMsg(req, res) {
  let { idfriend, chatid, msg } = req.body;

  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);
  let result = await ChatManagerI.PostMsg(chatid, new MsgDTO({ idfriend, msg, id }));

  ControllerError(result, res);
}

export async function CreateChat(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let { idfriend } = req.body;

  let result = await ChatManagerI.CreateChat(id, idfriend);

  ControllerError(result, res);
}

export async function getChat(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let result = await ChatManagerI.getChat(req.params.chatid);

  result = new ChatDTO(result, id);
  console.log(result);
  ControllerError(result, res);
}
