export default class MsgDTO {
  constructor(msg) {
    this.sender = msg.id;
    this.recipient = msg.idfriend;
    this.body = msg.msg;
  }
}
