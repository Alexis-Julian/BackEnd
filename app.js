import express from "express";
import errorHandler from "./middlewares/error.js";

// Ejemplo de uso

const app = express();

app.use(errorHandler);

export default app;
