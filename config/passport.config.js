import passport from "passport";
/* import jwt from "passpor-jwt"; */
import GitHubStrategy from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import userModel from "../dao/mongo/models/user.model.js";
import fetch from "node-fetch";
import UserFrontDTO from "../services/DTOs/user.dto.front.js";
import AuthManager from "../services/auth.service.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
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
          let token;

          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);
          if (!emailDetail) {
            return done(new Error("cannot get a valid email for this user"));
          }

          let user = { ...new UserFrontDTO(profile), password: "nopass", email: emailDetail.email };

          token = await AuthManagerI.loginUser(user, (token) => {});

          if (token) return done(null, token);

          token = await AuthManagerI.addUser(user, (token) => {});

          if (token) return done(null, token);
        } catch (e) {
          console.log("Error en auth github");
          console.log(e);
          return done(e);
        }
      }
    )
  );
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "1020937197638-854ub7qa8sb0utgg4jlomoka38gcqlua.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/sessions/googlecallback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let token;
          const user = { ...new UserFrontDTO(profile), password: "nopass" };

          token = await AuthManagerI.loginUser(user, (token) => {});

          if (token) return done(null, token);

          token = await AuthManagerI.addUser(user, (token) => {});

          if (token) return done(null, token);
        } catch (e) {
          throw CustomError({ name: "Error verifying user", cause: e.message, message: "Error google", code: EErrors.INVALID_TYPE_ERROR });
        }
      }
    )
  );

  passport.serializeUser((token, done) => {
    done(null, token);
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
