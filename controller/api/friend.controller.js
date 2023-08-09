import FriendManager from '../../services/friend_manager.js';
import { ControllerError } from '../../utils.js';
import jwt from 'jsonwebtoken';
import env from '../../config/enviroment.config.js';
const FriendManagerI = new FriendManager();
export async function addFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let idfriend = req.body;

  let result = await FriendManagerI.addFriend(id, idfriend);

  ControllerError(result, res);
}
