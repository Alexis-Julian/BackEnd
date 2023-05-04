import app from "./app.js";
import http from "http";
import middlewares from "./middlewares.js";
/* Initialization  Http Server*/
const httpServer = http.createServer(app);

middlewares(app);

httpServer.listen(8080);
console.log("Server listening on port 8080");
