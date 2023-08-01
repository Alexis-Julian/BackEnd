import express from "express";
export const app = express.Router();

app.get("/", (req, res) => {
  const micookie = req.cookies;
  res.send(micookie);
});
