import express from "express"
import passport from "passport";


export const app = express.Router();

app.get("/github",passport.authenticate("github",{scope:["user:email"]}));

app.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),(res,req)=>{
    req.session.user=req.user
    res.redirect("/")
})