import FriendManager from "../logic/friend_manager.js"

const IFriendManager = new FriendManager()
export function addFriend(req,res){
    IFriendManager.addFriend(req.body)
    res.send("Nice")
}