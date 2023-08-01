import FriendManager from "../../logic/friend_manager.js";

const IFriendManager = new FriendManager();
export async function addFriend(req, res) {
  /* IFriendManager.addFriend(req.body);
  let { _id } = await AuthManagerI.userFound(email);
  FriendManagerI.addFriend(_id);
  res.send("Nice"); */
  res.send("Nice");
}
