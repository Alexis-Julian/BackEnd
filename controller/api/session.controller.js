/* Enviar cookie por session*/
export function AuthenticateToken(req, res) {
  const token = req.session.passport.user;
  res.cookie("token", token);
  res.redirect("/view/products");
}
