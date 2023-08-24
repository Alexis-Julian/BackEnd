import express from "express";
import { getProducts } from "../../controller/api/mocking.controller.js";
export const app = express.Router();

app.get("/", getProducts);

app.post("/post", (req, res) => {});
