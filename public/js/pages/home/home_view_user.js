import getPageQuery from "../utils/utils.js";

const form = document.getElementById("form_submit");

async function sendProduct(idp) {
  const url = `http://localhost:8080/api/carts/undefined/product/${idp}`;

  let response = await fetch(url, { method: "POST" });

  let data = await response.json();

  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let instruction = e.submitter.name;

  let result = await sendProduct(instruction);

  if (result.status == "success") {
  } else {
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
