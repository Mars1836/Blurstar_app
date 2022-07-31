import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: { type: mongoose.Types.ObjectId, required: true },
    users: [mongoose.Types.ObjectId],
  },
  { timestamps: true }
);
const Message = mongoose.model("message", messageSchema);
export default Message;
