import fetch from "node-fetch";
export const SocketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("Cliente connected");
    socket.on("deleteproduct", async (id) => {
      let res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      socket.emit("deleteproduct", res);
    });
  });
};
