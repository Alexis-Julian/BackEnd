import { userAdmin as user } from "../config.js";
import { STATUS_TYPES } from "../utils.js";
export const ValidateisAdmin = (req, res, next) => {
  const { email, password } = req.body;
  if (user.email === email && user.password === password) {
    return res.render("home", { user });
  } else {
    next();
  }
};
