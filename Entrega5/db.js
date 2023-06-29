import mongoose from "mongoose";
import chalk from "chalk";
export const connectMongoDb = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1"
    );
    console.log(chalk.blue("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
};
