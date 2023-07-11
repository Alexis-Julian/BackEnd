const form = document.getElementById("form");
/* Provisorio  */
const fetchData = async (login) => {
  let response = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  });
  let data = await response.json();
  if (data.status === "SUCCESS") {
    window.location.href = "http://localhost:8080/view/products";
  } else {
    alert(data.data);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let [email, password] = e.target;
  let login = { email: email.value, password: password.value };
  fetchData(login);
});

const btn_github = document.getElementById("github");

btn_github.addEventListener("click", (e) => {
  window.location.href = "/api/sessions/github";
});
