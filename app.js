import express from "express";
import { connectMongoDb } from "./db.js";
import userModel from "./models/user.model.js";

connectMongoDb();

// Ejemplo de uso

/* const asd = async () => {
  let a = await userModel.find({});
  console.log(a);
};
asd(); */
const app = express();

export default app;
