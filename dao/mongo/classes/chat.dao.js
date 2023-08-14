import chatmodel from "../models/chat.model.js";
export default class ChatFactory {
  async createChat(id, idfriend) {
    try {
      let newChat = new chatmodel();
      console.log(id, idfriend);
      newChat.members.push(...[{ user: id }, { user: idfriend }]);

      await newChat.save();

      return newChat;
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  }
  async insertMessage(idchat, queries) {
    try {
      let data = await chatmodel
        .findByIdAndUpdate(idchat, queries && queries, { new: true })
        .populate("chat.sender")
        .populate("chat.recipient");
      return data.chat.pop();
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  }
  async getchat(idchat) {
    try {
      let chat = await chatmodel.findById(idchat).populate("members.user");
      return chat;
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  }
}
