import FriendManager from '../../services/friend_manager.js';
import jwt from 'jsonwebtoken';
import env from '../../config/enviroment.config.js';
import { ControllerError } from '../../utils.js';

const FriendManagerI = new FriendManager();

export async function addFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let idfriend = req.body;

  let result = await FriendManagerI.addFriend(id, idfriend);

  ControllerError(result, res);
}

export async function searchFriend(req, res) {
  let { username } = req.body;
  let result = await FriendManagerI.searchFriend(username);
  ControllerError(result, res);
}
