import { RemoveP } from "./ui.js";
import { DELETE_SOCKET_ON_PRODUCT, POST_SOCKET_ON_PRODUCT } from "./socket.js";
let btndelete = document.getElementById("delete");
let divlist = document.getElementById("divlist");
let formlist = document.getElementById("formsubmit");
console.log(divlist);
/* BTN DELETE PRODUCT */
btndelete.addEventListener("keyup", (e) => RemoveP(e));

/* SOCKET ESCUCHANDO */
DELETE_SOCKET_ON_PRODUCT(divlist);
/* --- */
POST_SOCKET_ON_PRODUCT();
