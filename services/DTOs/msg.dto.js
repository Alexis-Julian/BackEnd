import UserFrontDTO from "./user.dto.front.js";
export default class MsgDTO {
  constructor(msg) {
    this.sender = new UserFrontDTO(msg.sender);
    this.receiver = new UserFrontDTO(msg.recipient);
    this.body = msg.body;
  }
}
