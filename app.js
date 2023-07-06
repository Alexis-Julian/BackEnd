import express from "express";
import { connectMongoDb } from "./db.js";
import productModel from "./models/product.model.js";

connectMongoDb();

// Ejemplo de uso

const app = express();

export default app;
