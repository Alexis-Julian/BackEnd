/* Enviar cookie por session*/
export function AuthenticateToken(req, res) {
  const token = req.session.passport.user;
  res.cookie('token', token);
  res.redirect('/view/products');
}
{
  /* <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */
}
