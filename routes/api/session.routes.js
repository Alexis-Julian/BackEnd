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

app.post("/establecer", (req, res) => {
  /* const { id } = req.body; */
  req.session.usuarios = "123";
  console.log(req.session);
  /* res.send("nice"); */
  res.send("Nice");
});

app.get("/obtener", (req, res) => {
  console.log(req.session.usuarios);
  res.send(req.session);
});
