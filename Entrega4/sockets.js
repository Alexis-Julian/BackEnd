import { FETCHINGS } from "./utils.js";
import { VERBS_HTTP } from "./utils.js";

export const SocketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("Cliente connected");
    socket.on("deleteproduct", async (id) => {
      let res = await FETCHINGS(
        "http://localhost:8080/api/products/",
        id,
        VERBS_HTTP.DELETE
      );
      console.log(res);
      socket.emit("deleteproduct", res);
    });
  });
};
