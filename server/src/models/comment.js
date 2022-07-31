import mongoose from "mongoose";
const commentScheme = new mongoose.Schema(
  {
    userid: { type: mongoose.Types.ObjectId, require: true },
    content: { type: String, require: true },
  },
  { timestamps: true }
);
const Comment = new mongoose.model("comment", commentScheme);
export default Comment;
