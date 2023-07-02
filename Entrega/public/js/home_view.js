const form = document.getElementById("form_submit");
function sendProduct(idp) {
  let cart = prompt("Intgrese el id del carrito");
  const url = `http://localhost:8080/api/carts/${cart}/product/${idp}`;
  fetch(url, { method: "POST" });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let idp = e.submitter.name;
  sendProduct(idp);
});
