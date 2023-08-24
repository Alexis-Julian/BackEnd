import express from "express";

export const app = express.Router();

app.get("/get", (req, res) => {
  res.send(404);
});

app.post("/post", (req, res) => {});
