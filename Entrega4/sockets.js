import { FETCHINGS } from "./utils.js";
import { VERBS_HTTP } from "./utils.js";

export const SocketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("deleteproduct", async (id) => {
      let res = await FETCHINGS(
        "http://localhost:8080/api/products/",
        id,
        VERBS_HTTP.DELETE
      );
      console.log(res);
      socket.emit("deleteproduct", res);
    });
    socket.on("newproduct", async (pro) => {
      let body = pro;
      let res = await FETCHINGS(
        "http://localhost:8080/api/products",
        body,
        VERBS_HTTP.POST
      );
      socket.emit("newproduct", res.data);
    });
  });
};
