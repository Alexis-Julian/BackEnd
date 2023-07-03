import getPageQuery from "./utils.js";
/* const form = document.getElementById("form_submit");
function sendProduct(idp) {
  let cart = prompt("Intgrese el id del carrito");
  const url = `http://localhost:8080/api/carts/${cart}/product/${idp}`;
  fetch(url, { method: "POST" });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let idp = e.submitter.name;
  sendProduct(idp);
}); */

/* Siguiente pagina de productos */
const next_page = document.getElementById("next_page");

next_page.addEventListener("click", (e) => {
  e.preventDefault();
  const url = location.href;
  let urlquerys = new URL(url);
  getPageQuery(urlquerys, (numpage) => {
    urlquerys.searchParams.set("page", numpage + 1);
  });
  window.location.href = urlquerys.href;
});

/* Logout */
const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  const Logout = async () => {
    await fetch("http://localhost:8080/api/user/logout", {
      method: "POST",
    });
    window.location.href = "http://localhost:8080/view/user/login";
  };
  Logout();
});