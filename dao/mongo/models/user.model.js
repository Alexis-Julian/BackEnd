import mongoose, { mongo } from "mongoose";

const collection = "users";

const roles = ["admin", "usuario", "premium"];

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, enum: roles },
    img: { type: String },
    chats: {
      type: [{ idchat: { type: mongoose.Schema.Types.ObjectId, ref: "chats" }, user: { type: mongoose.Schema.Types.ObjectId, ref: "users" } }],
      default: [],
    },
    friends: {
      type: [
        {
          friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
      default: [],
    },
    request: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  },
  { versionKey: false }
);

export default mongoose.model(collection, userSchema);
