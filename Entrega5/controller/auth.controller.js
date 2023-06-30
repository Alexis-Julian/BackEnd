import AuthManager from "../logic/auth_manager.js";
import { STATUS_RES_GET } from "../utils.js";
import userModel from "../models/user.model.js";
const AuthManagerI = new AuthManager();

export async function AuthLogin(req, res) {
  let msg = await AuthManagerI.loginUser(req.body, (token) => {
    res.cookie("token", token);
  });
  STATUS_RES_GET(msg, res);
}

export async function AuthRegister(req, res) {
  let user = await AuthManagerI.addUser(req.body, (token) => {
    res.cookie("token", token);
  });
  STATUS_RES_GET(user, res);
}

export async function AuthLogout(req, res) {
  res.clearCookie("token").status(202).send("Cookie Removed");
}
export async function AuthProfile(req, res) {
  let { id } = req.token;
  const user = await userModel.findOne({ _id: id }).select("-password");
  res.render("profile", { user });
}
