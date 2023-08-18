import getPageQuery from "../utils/utils.js";
import { Alert } from "../utils/utils.js";
const AlertI = new Alert();
const form = document.getElementById("form_submit");

async function sendProduct(idp) {
  console.log(idp);
  const url = `http://localhost:8080/api/carts/undefined/product/${idp}`;
  let response = await fetch(url, { method: "POST" });
  let data = await response.json();
  console.log(data);
}

async function fetchchangeproduct(idp, value) {
  let result = await fetch(`http://localhost:8080/api/products/${idp}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(value) });
  result = await result.json();
  return result;
}

async function removeProduct(idp) {
  let result = await fetch(`http://localhost:8080/api/products/${idp}`, { method: "DELETE" });
  result = await result.json();
  return result;
}

function changeProduct(input, callback) {
  input.disabled = false;
  input.focus();
  input.addEventListener("keydown", async (e) => {
    if (e.keyCode === 13) {
      input.value = e.target.value;

      await callback(input.value);

      input.disabled = true;
    }
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  form.classList.add("pointer-events-none");

  let instruction = e.submitter.name;

  let idp = e.submitter.querySelector("#product");

  let input = e.submitter.querySelector("input");

  if (idp) idp = idp.getAttribute("name");
  switch (instruction) {
    case "category":
      changeProduct(input, async (value) => {
        await fetchchangeproduct(idp, { category: value });
      });

      form.classList.remove("pointer-events-none");
      break;
    case "price":
      changeProduct(input, async (value) => {
        value = value.slice(1, value.length);
        await fetchchangeproduct(idp, { price: value });
      });

      form.classList.remove("pointer-events-none");
      break;
    case "stock":
      changeProduct(input, async (value) => {
        await fetchchangeproduct(idp, { stock: parseInt(value) });
      });

      form.classList.remove("pointer-events-none");
      break;
    default:
      let result = await removeProduct(instruction);
      if (result.status === "success") {
        AlertI.Success("Product successfully removed");
      } else if (result.status === "error") {
        AlertI.Error("Product failed to be removed");
      }

      break;
  }
});

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

const previous_page = document.getElementById("previous_page");

previous_page.addEventListener("click", (e) => {
  e.preventDefault();
  const url = location.href;
  let urlquerys = new URL(url);
  getPageQuery(urlquerys, (numpage) => {
    if (numpage > 1) {
      urlquerys.searchParams.set("page", numpage - 1);
      window.location.href = urlquerys.href;
    }
  });
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
