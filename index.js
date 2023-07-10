import app from "./app.js";
import middlewares from "./middlewares.js";
import expressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import initializePassport from "./config/passport.config.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import config from "./config.js";
import http from "http";
import { PORT } from "./config.js";
import { SocketIo } from "./sockets.js";
import { Server as ServerWebSocket } from "socket.io";
import chalk from "chalk";
/* Initialization  Http Server*/
const httpserver = http.createServer(app);

/* Engine Template */
app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

/* ConfigPassport */
initializePassport()

/* MiddleWares */
middlewares(app);

/* Sockets */
export const io = new ServerWebSocket(httpserver);
SocketIo(io);
/* Config */
config(app);

/* Server Listen */
httpserver.listen(PORT);
console.log(chalk.blueBright("Server listening on port", +PORT));
