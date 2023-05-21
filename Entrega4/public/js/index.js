let btndelete = document.getElementById("delete");
let btnadd = document.getElementById("add");
let divlist = document.getElementById("divlist");

import { RemoveP, AddP } from "./ui.js";
import { DELETE_SOCKET_ON_PRODUCT, POST_SOCKET_ON_PRODUCT } from "./socket.js";

/* let formlist = document.getElementById("formsubmit");*/

/* BTN DELETE PRODUCT */
btndelete.addEventListener("keyup", (e) => RemoveP(e));

/* BTN ADD PRODUCT */
btnadd.addEventListener("keyup", (e) => AddP(e));

/* SOCKET ESCUCHANDO */
DELETE_SOCKET_ON_PRODUCT(divlist);
/* --- */
POST_SOCKET_ON_PRODUCT(divlist);
