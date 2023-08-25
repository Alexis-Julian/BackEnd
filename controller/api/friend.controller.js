import FriendManager from "../../services/friend.service.js";
import jwt from "jsonwebtoken";
import env from "../../config/enviroment.config.js";
import { ControllerError } from "../../utils.js";
import { io } from "../../index.js";

const FriendManagerI = new FriendManager();

export async function addFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let { idfriend } = req.body;

  let result = await FriendManagerI.addFriend(id, idfriend);

  await FriendManagerI.requestRemove(id, idfriend);

  await FriendManagerI.addFriend(idfriend, id);

  ControllerError(result, res);
}

export async function declineFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let { idfriend } = req.body;

  let result = await FriendManagerI.requestRemove(id, idfriend);

  ControllerError(result, res);
}

export async function searchFriend(req, res) {
  let { username } = req.body;

  let result = await FriendManagerI.searchFriend(username);

  ControllerError(result, res);
}

export async function requestFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let { reqfriend } = req.body;

  let result = await FriendManagerI.requestFriend(reqfriend, id);

  if (result) io.emit(`${reqfriend}:solicitud`, result);

  ControllerError(result, res);
}

export async function getRequestFriend(req, res) {
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let result = await FriendManagerI.getrequestFriend(id);

  ControllerError(result, res);
}
