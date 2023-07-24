import passport from "passport";
import GitHubStrategy from "passport-github2";
import userModel from "../models/user.model.js";
import fetch from "node-fetch";
import AuthManager from "../logic/auth_manager.js";
import { STATUS_TYPES } from "../utils.js";

const AuthManagerI = new AuthManager();

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.eb4fe2b67d5e86f1",
        clientSecret: "b23b9bb8b29c782763a920be9119c5edd73e1504",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer " + accesToken,
              "X-Github-Api-Version": "2022-11-28",
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);
          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }
          profile.email = emailDetail.email;
          let profilel = {
            email: profile.email,
            password: "nopass",
            username: profile._json.name || profile._json.login || "noname",
            img: profile._json.avatar_url,
          };
          let validUser = await AuthManagerI.loginUser(profilel, (token) => {
            /* console.log(token); */
          });
          if (STATUS_TYPES.INFO === validUser[1]) return done(null, validUser);

          let regiUser = await AuthManagerI.addUser(profilel, (token) => {
            /* console.log(token); */
          });
          return done(null, regiUser);
        } catch (e) {
          console.log("Error en auth github");
          console.log(e);
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((validUser, done) => {
    /* console.log("Serial", validUser); */
    /* console.log(validUser); */
    done(null, validUser);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("Por aqui");
    let user = await userModel.findById(id);

    console.log("Deserial", user);
    /* console.log(id, id);
    done(null, user); */
  });
};

export default initializePassport;
