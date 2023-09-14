import winston from "winston";
import { program } from "../config/enviroment.config.js";

export const logger = winston.createLogger(program.opts().mode == "DEVELOPMENT" ? ErrorsDevelopment() : ErrorsProduction());

function ErrorsDevelopment() {
  return {
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
      }),
    ],
  };
}

function ErrorsProduction() {
  return {
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.simple(),
      }),
    ],
  };
}
