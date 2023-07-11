import { ConfirmPassword } from "/js/utils.js";
const form = document.getElementById("form");
const reload = document.getElementById("charge");
/* Provisorio  */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  reload.classList.add("animate-spin");
  let [email, username, password, confirmpassword] = e.target;
  let pass = ConfirmPassword(confirmpassword, password);
  let register = {
    email: email.value,
    password: password.value,
    username: username.value,
  };
  if (pass) {
    let json = fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    }).then((response) => {
      return response.json();
    });
    json.then((res) => {
      if (res.status == "SUCCESS") {
        window.location.href = "http://localhost:8080/view/products";
      }
    });
  } else {
    alert("Nazhe");
  }
  reload.classList.remove("animate-spin");
});

/* btn Login GitHub */
const btn_github = document.getElementById("github");

btn_github.addEventListener("click", (e) => {
  reload.classList.add("animate-spin");
  window.location.href = "/api/sessions/github";
});

/* Show password */
const checkbox = document.getElementById("checked");
const img_pass = document.getElementById("imgpass");
const confirmpassword = document.getElementById("confirm-password");

checkbox.addEventListener("click", (e) => {
  if (checkbox.checked) {
    img_pass.src = "/svg/eyeopen.svg";
    confirmpassword.type = "text";
  } else {
    img_pass.src = "/svg/eyeclose.svg";
    confirmpassword.type = "password";
  }
});
