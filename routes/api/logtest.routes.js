import express from "express";
import { logger } from "../../utils/logger.js";
import { transport } from "../../libs/nodemailer.js";

export const app = express.Router();

app.get("/error", (req, res) => {
  logger.error("Error received");
  res.send("Error testing");
});

app.get("/warn", (req, res) => {
  logger.warn("Warning received");
  res.send("Warn testing");
});

app.get("/info", (req, res) => {
  logger.info("Info received");
  res.send("Info testing");
});

app.get("/http", (req, res) => {
  logger.http("http received");
  res.send("http testing");
});

app.get("/verbose", (req, res) => {
  logger.verbose("Verbose received");
  res.send("verbose testing");
});

app.get("/debug", (req, res) => {
  logger.debug("debug received");
  res.send("debug testing");
});

app.get("/mail", async (req, res) => {
  let result = await transport.sendMail({
    from: "buzzar50@gmail.com",
    to: "alexisjrojas@hotmail.es",
    subject: "Correo de prueba",
    html: "<div><h1>Esto es un test</h1></div>",
    attachments: [],
  });
  console.log("Correo enviado");
  res.send("Test");
});
