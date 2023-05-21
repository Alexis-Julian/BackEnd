const btndelete = document.getElementById("delete");
let divlist = document.getElementById("divlist");
let formlist = document.getElementById("formsubmit");

/* Cliente Socket */

const socket = io();

btndelete.addEventListener("keyup", function ({ key }) {
  if (key === "Enter") {
    socket.emit("deleteproduct", btndelete.value);
  }
});
let a = ({ children }) => {
  for (let index = 0; index < children.length; index++) {
    console.log(children[index].innerHTML);
  }
};
a(divlist);
socket.on("deleteproduct", (res) => {
  console.log(formlist);
});

socket.on("newproduct", (product) => {
  divlist.innerHTML += `<li>${JSON.stringify(product)}</li`;
});
