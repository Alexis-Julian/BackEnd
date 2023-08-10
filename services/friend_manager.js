import ObjectID from "bson-objectid";
import AuthFactory from "../dao/mongo/classes/auth.dao.js";

const AuthFactoryI = new AuthFactory();

export default class FriendManager {
  async addFriend(id, idfriend) {
    let user = await AuthFactoryI.UserFoundById(id, AddFriendQueries(idfriend), { new: true });

    return user;
  }

  removeFriend() {}

  async searchFriend(found) {
    let users = await AuthFactoryI.UserFoundSimilar(found);
    return users;
  }

  /* Modificar removeRequest y requestFriend para que hagan lo mismo por queries */
  async requestRemove(iduser, idfriend) {
    let user = await AuthFactoryI.UserUpdateOne(iduser, { $pull: { request: { user: idfriend } } });
    return user;
  }

  async requestFriend(idfriend, iduser) {
    let user = await AuthFactoryI.UserFoundById(idfriend, { $push: { request: { user: iduser } } });
    return user;
  }
}

function AddFriendQueries(idfriend) {
  return {
    $push: {
      friends: { friend: idfriend },
    },
  };
}
