import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    content: {
      cap: { type: String },
      data: { type: String },
    },
    likes: [mongoose.Types.ObjectId],
    comments: [
      {
        userid: mongoose.Types.ObjectId,
        id: mongoose.Types.ObjectId,
        content: String,
        updatedAt: { type: Date, default: Date.now },
        createAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("post", postSchema);
export default Post;
