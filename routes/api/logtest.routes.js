import express from "express";
import { logger } from "../../utils/logger.js";

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
