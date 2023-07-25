import express from "express";
import passport from "passport";
export const app = express.Router();

app.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/view/user/register" }),
  (req, res) => {
    const token = req.session.passport.user[0];
    res.cookie("token", token);
    res.redirect("/view/products");
  }
);

app.get("/establecer", (req, res) => {
  req.session.usuarios = "64a6db4f692dda855a05b665";
  res.send("Nice");
});

app.get("/obtener", (req, res) => {
  console.log(req.session)
  res.send("Peticion");
});
