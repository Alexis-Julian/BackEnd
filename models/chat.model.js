import mongoose from "mongoose";

let collection = "chats";

const ChatSchema = new mongoose.Schema(
  {
    chat: {
      users: { type: [] },
      chats: { type: [] },
    },
  },
  { versionKey: false }
);
export default mongoose.model(collection, ChatSchema);
