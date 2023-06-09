import mongoose from "mongoose";

const collection = "users";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    img: { type: String },
  },
  { versionKey: false }
);

export default mongoose.model(collection, userSchema);
