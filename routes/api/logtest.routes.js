import express from "express";
import { logger } from "../../utils/logger.js";

export const app = express.Router();

app.get("/error", (req, res) => {});

app.get("/warn", (req, res) => {});

app.get("/info", (req, res) => {});

app.get("/http", (req, res) => {});

app.get("/verbose", (req, res) => {});

app.get("/debug", (req, res) => {
  logger.debug("Un debug normalito");
  res.send("debug normal");
});
