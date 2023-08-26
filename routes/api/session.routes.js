import express from "express";
import passport from "passport";
import { AuthenticateToken } from "../../controller/api/session.controller.js";
export const app = express.Router();

app.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/view/user/register" }), AuthenticateToken);

app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/googlecallback", passport.authenticate("google", { failureRedirect: "/view/user/register" }), AuthenticateToken);

/* Lo estoy usando de test "Ignorar" */
app.get("/establecer", (req, res) => {
  req.session.usuarios = "64a6db4f692dda855a05b665";
  res.send("Nice");
});

app.get("/obtener", (req, res) => {
  console.log(req.session);
  res.send("Peticion");
});
