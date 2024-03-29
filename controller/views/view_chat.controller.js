import userModel from "../../dao/mongo/models/user.model.js";
import jwt from "jsonwebtoken";
import env from "../../config/enviroment.config.js";

export async function Chat(req, res) {
  /* Agregar DTO */
  let token = req.session.passport.user;

  let { id } = jwt.verify(token, env.TOKEN);

  let user = await userModel.findById(id).populate("friends.friend").populate("request.user").populate("chats.idchat");
  res.render("chats", { user });
}
