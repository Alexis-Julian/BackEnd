import UserFrontDTO from "./user.dto.front.js";

export default class ChatDTO {
  constructor(chat, id) {
    this.id = chat._id;
    this.members = chat.members.map((e) => {
      if (e.user.id == id) {
        let sender = { ...new UserFrontDTO(e.user) };
        return { sender: sender };
      } else {
        let receiver = { ...new UserFrontDTO(e.user) };
        return { receiver: receiver };
      }
    });
    this.chat = chat.chat.map((e) => {
      return { sender: e.sender, recipient: e.recipient, body: e.body };
    });
  }
}
