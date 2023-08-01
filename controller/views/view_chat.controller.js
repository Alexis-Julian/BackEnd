import userModel from "../../models/user.model.js";
let usertest = "64acaa57a070ea86959d856e";

export async function Chat(req, res) {
  let user = await userModel
    .findById({ _id: usertest })
    .populate("friends.friend")
    .select("-_id")
    .populate("chats.idchat");
  /* console.log(user.friends); */
  res.render("chats", { user });
}
