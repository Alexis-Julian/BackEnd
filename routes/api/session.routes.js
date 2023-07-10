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
