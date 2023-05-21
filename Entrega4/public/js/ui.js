import {
  DELETE_SOCKET_EMIT_PRODUCT,
  POST_SOCKET_EMIT_PRODUCT,
} from "./socket.js";

export const RemoveP = (e) => {
  if (e.key === "Enter") {
    DELETE_SOCKET_EMIT_PRODUCT(e.target.value);
  }
};

export const RemovePrUi = (res, divlist) => {
  if (res.status === "SUCCESS") {
    let product = JSON.stringify(res.data);
    for (let index = 0; index < divlist.children.length; index++) {
      if (divlist.children[index].innerHTML === product) {
        divlist.children[index].remove();
      }
    }
  } else if (res.status === "WARNING") {
  } else {
  }
};

export const AddP = (e) => {
  if (e.key === "Enter") {
    POST_SOCKET_EMIT_PRODUCT(e.target.value);
  }
};
