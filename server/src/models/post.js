import mongoose from "mongoose";
import Comment from "./comment.js";
import User from "./user.js";
const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    content: {
      cap: { type: String },
      data: { type: String },
    },
    likes: [mongoose.Types.ObjectId],
    comments: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);
postSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (t) {
    await User.updateOne(
      { _id: this.author },
      {
        $pull: {
          posts: { $eq: this._id },
        },
      }
    );
    if (this.comments.length > 0) {
      const comments = await Comment.deleteMany({
        _id: { $in: this.comments },
      });
    }
    t();
  }
);
postSchema.pre("save", function () {});
const Post = mongoose.model("post", postSchema);
export default Post;
