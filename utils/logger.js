import winston from "winston";
import { program } from "../config/enviroment.config.js";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});
