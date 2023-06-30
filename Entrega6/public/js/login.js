const form = document.getElementById("form");
/* Provisorio  */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let [email, password] = e.target;
  let login = { email: email.value, password: password.value };
  let json = fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  }).then((response) => {
    return response.json();
  });
  json.then((res) => {
    if (res.status == "SUCCESS") {
      window.location.href = "http://localhost:8080/view/user/product";
    }
  });
});
