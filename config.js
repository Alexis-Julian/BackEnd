import path from "path";
import { fileURLToPath } from "url";
const url = fileURLToPath(import.meta.url);

export const file = path.dirname(url);

export default (app) => {
  app.set("views", file + "/views");
  app.set("view engine", "handlebars");
};

export const TOKEN = "hola";

export const GITHUB_CLIENT_ID = "";

export const GITHUB_CLIENT_SECRET = "";

export const userAdmin = {
  username: "Coder",
  email: "adminCoder@coder.com",
  password: "adminCod3r123",
  role: "admin",
};
export const PORT = 8080;
