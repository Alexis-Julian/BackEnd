import express from "express";
import cookieParser from "cookie-parser";
export const app = express.Router();

app.get("/", (req, res) => {
  const micookie = req.cookies;
  res.send(micookie);
});
