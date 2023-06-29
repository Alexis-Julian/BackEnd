import express from "express";
import { connectMongoDb } from "./db.js";
import cartModel from "./models/cart.model.js";
connectMongoDb();

// Ejemplo de uso

const app = express();

export default app;
