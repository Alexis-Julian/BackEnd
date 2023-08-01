import ChatManager from "../../logic/chat_manager.js";

const ChatManagerI = new ChatManager();

export function PostMsg(req, res) {
  const { sender, recipient, body } = req.body;

  res.send("Nice");
}

export function CreateChat(req, res) {
  ChatManagerI.CreateChat(req.body);
  res.send("Jyita");
}
