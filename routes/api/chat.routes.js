import express from "express";
import { PostMsg } from "../../controller/chat.controller.js";



export const app = express.Router();



app.post("/", PostMsg);


