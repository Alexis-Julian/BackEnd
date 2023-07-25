import mongoose from "mongoose";

let collection = "chats";

const ChatSchema = new mongoose.Schema(
  {
      chat: {
        type: [
          {
            sender: {
              type: String,
              required: true,
            },
            recipient: { type: String, required: true },
            body: { type: String, required: true },
          },
        ],
      },
    },
  { versionKey: false }
);
export default mongoose.model(collection, ChatSchema);
