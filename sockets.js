/* Server Socket */
import axios from "axios";
import jwt from "jsonwebtoken";
import env from "./config/enviroment.config.js";

function parsing(token) {
  let save = 0;
  let tokenformat = "";
  for (let index = 0; index < token.length; index++) {
    if (token[index] == "=") {
      save = 1;
    } else if (token[index] == ";") {
      break;
    } else if (save == 1) {
      tokenformat += token[index];
    }
  }
  return tokenformat;
}

export const SocketIo = (io) => {
  io.on("connection", (socket) => {
    let token = socket.handshake.headers.cookie;

    token = parsing(token);

    let { id } = jwt.verify(token, env.TOKEN);

    console.log("User id connected", id);

    socket.emit("SocketId", id);
  });
};
