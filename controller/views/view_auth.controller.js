export function ViewLogin(req, res) {
  res.render("login");
}

export function ViewRegister(req, res) {
  res.render("register");
}

export function ViewProduct(req, res) {
  res.render("product");
}

export function ViewRecover(req, res) {
  res.render("recover");
}

export function ChangePassword(req, res) {
  let email = req.email;

  res.status(200).json({ message: "Hola ! " + email + " estas en cambiar contraseña esta funcion estara disponible mas adelante" });
}
