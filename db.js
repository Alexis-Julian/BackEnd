import mongoose from "mongoose";
import chalk from "chalk";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Buzzar:ywSH2yEkcHVkUo42@cluster0.031b0cm.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(chalk.blue("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
};
