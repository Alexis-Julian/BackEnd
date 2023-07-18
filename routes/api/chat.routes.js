import express from "express";


export const app = express.Router();



app.post("/", PostMsg);
