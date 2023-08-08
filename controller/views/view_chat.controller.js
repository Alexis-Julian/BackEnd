import userModel from "../../dao/mongo/models/user.model.js";
let usertest = "64acaa57a070ea86959d856e";

export async function Chat(req, res) {
  let user = await userModel
    .findById({ _id: usertest })
    .populate("friends.friend")
    .select("-_id")
    .populate("chats.idchat");

  res.render("chats", { user });
}
