import userModel from "../models/user.model.js";
import chatModel from "../models/chat.model.js";
export default class ChatManager {
  CreateChat(users) {
    let aux = Object.values(users);

    let userid = this.UserFound(aux);
  }
  async UserFound(users) {
    const ChatI = new chatModel();
    const { _id } = ChatI;
    let aux_users = await userModel.find({ email: { $in: users } });

    aux_users.forEach((element) => {
      /* element.chats.push({ idchat: _id }); */
      ChatI.members.push({ user: element });
    });

    let aux_users_update = await userModel.updateMany(
      { email: { $in: users } },
      { $push: { chats: { idchat: _id } } },
      { new: true }
    );

    console.log(aux_users_update);
  }

  async PostMsg() {}
}
