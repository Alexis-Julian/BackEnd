/* Este me hace dudar */
export function AuthenticateToken(req, res) {
  const token = req.session.passport.user[0];
  res.cookie("token", token);
  res.redirect("/view/products");
}
