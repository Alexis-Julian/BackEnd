const form = document.getElementById("form");
const reload = document.getElementById("charge");
const btn_github = document.getElementById("github");
const btn_google = document.getElementById("google");
import { Alert } from "../utils/utils.js";
/* Provisorio  */
const IAlert = new Alert();

const fetchData = async (login) => {
  try {
    let response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });
    let data = await response.json();
    console.log(data);
    if (data.status === "success") {
      window.location.href = "http://localhost:8080/view/products";
    } else {
      IAlert.Error("User not found");
    }
  } catch (e) {
    console.log("Error:" + e.message);
  }

  reload.classList.remove("animate-spin");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  reload.classList.add("animate-spin");
  let [email, password] = e.target;
  let login = { email: email.value, password: password.value };
  fetchData(login);
});

btn_github.addEventListener("click", (e) => {
  reload.classList.add("animate-spin");
  window.location.href = "/api/sessions/github";
});

btn_google.addEventListener("click", (e) => {
  reload.classList.add("animate-spin");
  window.location.href = "/api/sessions/google";
});
