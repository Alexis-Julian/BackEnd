import ObjectID from 'bson-objectid';
import AuthFactory from '../dao/mongo/classes/auth.dao.js';

const AuthFactoryI = new AuthFactory();

export default class FriendManager {
  async addFriend(id, idfriend) {
    let { _id } = await AuthFactoryI.UserFoundById(idfriend);
    idfriend = _id;

    let user = await AuthFactoryI.UserFoundById(id, AddFriendQueries(idfriend), { new: true });

    return user;
  }

  removeFriend() {}

  async searchFriend(found) {
    let users = await AuthFactoryI.UserFoundSimilar(found);
    return users;
  }
}

function AddFriendQueries(idfriend) {
  return {
    $push: {
      friends: { friend: idfriend },
    },
  };
}

function searchCoincidence(found) {
  return [{ username: { $regex: found, $options: 'i' } }];
}
