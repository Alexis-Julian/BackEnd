const form_recovery = document.getElementById("recovery_form");

async function ApiRecovery(email) {
  let data = await fetch(`http://localhost:8080/api/user/recover/${email}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
  });

  return await data.json();
}

form_recovery.addEventListener("submit", async (e) => {
  e.preventDefault();

  email = e.target["email"].value;

  let result = await ApiRecovery(email);
});
