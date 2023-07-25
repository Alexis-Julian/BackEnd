import userModel from "../models/user.model.js";
let usertest = "64bf1070fdcd43c8c6c97681";

export async function Chat(req, res) {
  let user = await userModel
    .findById({ _id: usertest })
    .populate("friends.friend")
    .select("-_id");
  /* console.log(user.friends); */
  res.render("chats", { user });
}
