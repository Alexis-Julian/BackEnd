import { ConfirmPassword } from "/js/utils.js";
const form = document.getElementById("form");
/* Provisorio  */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let [email, confirmpassword, password] = e.target;
  let pass = ConfirmPassword(confirmpassword, password);
  let register = {
    email: email.value,
    password: password.value,
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
        window.location.href = "http://localhost:8080/view/user/product";
      }
    });
  } else {
    alert("Nazhe");
  }
});


const btn_github = document.getElementById("github")

btn_github.addEventListener("click",(e)=>{
})