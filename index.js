import app from "./app.js";
import middlewares from "./middlewares.js";
import expressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import initializePassport from "./config/passport.config.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import config from "./config.js";
import http from "http";
import { SocketIo } from "./sockets.js";
import { Server as ServerWebSocket } from "socket.io";
import chalk from "chalk";
import env from "./config/enviroment.config.js";
import { faker } from "@faker-js/faker";
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
initializePassport();

/* MiddleWares */
middlewares(app);

/* cambiando(); */

/* Sockets */
export const io = new ServerWebSocket(httpserver);

SocketIo(io);
/* Config */
config(app);

/* Server Listen */
httpserver.listen(env.PORT);

console.log(chalk.blueBright("Server listening on port", +env.PORT));
