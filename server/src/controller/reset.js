import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
const reset = {
  post: async (req, res) => {
    try {
      await Post.remove();
      await Comment.remove();
      await User.updateMany(
        {},
        {
          $set: { posts: [] },
        }
      );
      res.status(200).json("remove all posts");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  user: async (req, res) => {
    try {
      await Post.remove();
      await User.remove();
      await Comment.remove();
      res.status(200).json("remove success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  comment: async (req, res) => {
    try {
      await Comment.remove();
      await Post.updateMany(
        {},
        {
          $set: { comments: [] },
        }
      );
      res.status(200).json("remove comments");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default reset;
