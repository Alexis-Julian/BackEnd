import mongoose from "mongoose";
import chalk from "chalk";
import env from "./config/enviroment.config.js";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log(chalk.blue("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
};
