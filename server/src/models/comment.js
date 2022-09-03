import mongoose from "mongoose";
import User from "./user.js";
const commentScheme = new mongoose.Schema(
  {
    userid: { type: mongoose.Types.ObjectId, require: true },
    content: { type: String, require: true },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

commentScheme.pre(
  "deleteOne",
  { document: true, query: false },
  async function (t) {
    const cm = await Comment.deleteMany({
      _id: { $in: this.comments },
    });
    t();
  }
);
commentScheme.pre(
  "deleteMany",
  { document: true, query: true },
  async function (t) {
    const comments = await this.model.find(this.getFilter());
    comments.forEach(async (comment) => {
      if (comment.comments?.length > 0) {
        const cm = await this.model.deleteMany({
          _id: { $in: comment.comments },
        });
      }
    });
    t();
  }
);
commentScheme.pre("save", function () {});
const Comment = mongoose.model("comment", commentScheme);
export default Comment;
