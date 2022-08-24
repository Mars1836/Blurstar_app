import Post from "../models/post.js";
import User from "../models/user.js";
const reset = {
  post: async (req, res) => {
    try {
      await Post.remove();
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
      res.status(200).json("remove success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default reset;
