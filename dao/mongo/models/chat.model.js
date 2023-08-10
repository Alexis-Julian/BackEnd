import mongoose, { mongo } from "mongoose";

let collection = "chats";

const ChatSchema = new mongoose.Schema(
  {
    members: { type: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "users" } }] },
    chat: {
      type: [
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
          },
          recipient: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
          body: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { versionKey: false }
);
export default mongoose.model(collection, ChatSchema);
