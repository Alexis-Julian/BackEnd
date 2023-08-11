import UserFrontDTO from "./user.dto.front.js";

export default class ChatDTO {
  constructor(chat, id) {
    this.id = chat._id;
    this.members = this.formatmembers(chat, id);
    this.chat = this.formatmsg(chat);
  }

  formatmembers(chat, id) {
    let members = { sender: {}, receiver: {} };
    let a = chat.members.map((e) => {
      if (e.user.id == id) {
        members.sender = new UserFrontDTO(e.user);
      } else {
        members.receiver = new UserFrontDTO(e.user);
      }
    });
    return members;
  }

  formatmsg(chat) {
    return chat.chat.map((e) => {
      return { sender: e.sender, recipient: e.recipient, body: e.body };
    });
  }
}
