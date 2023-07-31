import express from "express";
import AuthManager from "../../logic/auth_manager.js";
import FriendManager from "../../logic/friend_manager.js";
import cookies from "cookie-parser";
const AuthManagerI = new AuthManager();
const FriendManagerI = new FriendManager();
export const app = express.Router();

app.post("/add", async (req, res) => {
  const email = req.body;
  /* Busca el usuario a agregar */
  let { _id } = await AuthManagerI.userFound(email);
  FriendManagerI.addFriend(_id);
  res.send("Nice");
});

app.get("/test", (res, req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  res.send(token);
});
