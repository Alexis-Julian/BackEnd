const form = document.getElementById("form");
/* Provisorio  */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let [email, username, password] = e.target;
  let register = {
    email: email.value,
    username: username.value,
    password: password.value,
  };
  let json = fetch("http://localhost:8080/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(register),
  }).then((response) => {
    return response.json();
  });
  json.then((res) => {
    if (res.status == "SUCCESS") {
      window.location.href = "http://localhost:8080/view/user/product";
    }
  });
});
