import { RemovePrUi } from "./ui.js";
/* Cliente Socket */
const socket = io();

export const DELETE_SOCKET_EMIT_PRODUCT = (id) => {
  socket.emit("deleteproduct", id);
};

export const DELETE_SOCKET_ON_PRODUCT = (divlist) => {
  socket.on("deleteproduct", (res) => RemovePrUi(res, divlist));
};

export const POST_SOCKET_EMIT_PRODUCT = (res) => {
  socket.emit("newproduct", res);
};

export const POST_SOCKET_ON_PRODUCT = (divlist) => {
  socket.on("product", (res) => {
    if (typeof res[0] != "string")
      divlist.innerHTML += `<li>${JSON.stringify(res[0])}</li>`;
  });
};
