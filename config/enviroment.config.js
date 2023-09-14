import dotenv from "dotenv";
import { Command } from "commander";

export const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
  path: program.opts().mode === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  TOKEN: process.env.TOKEN_JWT,
  ADMIN: JSON.parse(process.env.ADMIN),
  PERSISTENCE: process.env.PERSISTENCE,
  GOOGLE: process.env.GOOGLE_PASSWORD,
};
