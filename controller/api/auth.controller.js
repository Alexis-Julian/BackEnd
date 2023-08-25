import AuthManager from "../../services/auth.service.js";
import { ControllerError } from "../../utils.js";
import userModel from "../../dao/mongo/models/user.model.js";

const AuthManagerI = new AuthManager();

export async function AuthLogin(req, res) {
  let result = await AuthManagerI.loginUser(req.body, (token, cart) => {
    req.session.passport = { user: token, cart: cart };
    res.cookie("token", token);
  });

  ControllerError(result, res);
}

export async function AuthRegister(req, res) {
  let user = await AuthManagerI.addUser(req.body, (token, cart) => {
    req.session.passport = { user: token, cart: cart };
    res.cookie("token", token);
  });

  ControllerError(user, res);
}

export async function AuthLogout(req, res) {
  req.session.destroy();
  res.clearCookie("token").status(202).send("Cookie Removed");
}

export async function AuthProfile(req, res) {
  let { id } = req.token;
  const user = await userModel.findOne({ _id: id }).select("-password");
  res.render("home", { user });
}
