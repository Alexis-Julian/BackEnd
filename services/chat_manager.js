import { Chat as ChatFactory, Auth as AuthFactory } from "../dao/factory.js";

const ChatFactoryI = new ChatFactory();

const AuthFactoryI = new AuthFactory();

export default class ChatManager {
  async CreateChat(id, idfriend) {
    let chat;

    chat = await ChatExist(id, idfriend);

    if (chat) return chat;

    chat = await ChatFactoryI.createChat(id, idfriend);

    if (!chat) return null;

    let iduser = await AuthFactoryI.UserFoundById(id, { $push: { chats: { idchat: chat._id, user: idfriend } } });

    if (!iduser) return null;

    let userfriend = await AuthFactoryI.UserFoundById(idfriend, { $push: { chats: { idchat: chat._id, user: id } } });

    if (!userfriend) return null;

    return chat;
  }

  async PostMsg(idchat, message) {}

  async getChat(idchat) {
    return await ChatFactoryI.getchat(idchat);
  }
}

async function ChatExist(id, idfriend) {
  let user = await AuthFactoryI.UserFoundById(id);

  return user.chats.find((chat) => chat.user == idfriend);
}
