import Post from "../models/post.js";
import Comment from "../models/comment.js";
import cloudinary from "../database/cloudinary.js";
const postController = {
  getAll: async (req, res) => {
    try {
      const posts = await Post.find().sort({ $natural: -1 });
      res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findById: async (req, res) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    const newPost = new Post({
      author: req.body.post.author,
      content: req.body.post.content,
      like: [],
      comments: [],
    });
    if (req.body.dataURL) {
      await cloudinary.uploader.upload(
        req.body.dataURL,
        async function (err, rs) {
          if (err) {
            return res.status(500).json(err);
          }
          newPost.content.data = rs.url;
        }
      );
    } else {
      newPost.content.data = "";
    }
    newPost.save(function (err) {
      if (err) {
        res.json(err);
        return;
      }
      res.json(newPost);
    });
  },
  addComment: async (req, res) => {
    const id = req.params.id; //id post
    const newComment = new Comment({
      userid: req.body.userId,
      content: req.body.content,
    });
    try {
      const postUpdate = await Post.updateOne(
        {
          _id: id,
        },
        {
          $push: {
            comments: {
              $each: [newComment],
              $position: 0,
            },
          },
        }
      );
      res.json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  handleLike: async (req, res) => {
    const id = req.params.id; //id post
    try {
      const post = await Post.findById(id);
      const isexist = post?.likes.find(
        (id) => id.toString() === req.body.userId
      );
      if (isexist) {
        await Post.update({ $pull: { likes: req.body.userId } });
        res.json("dislike");
        return;
      }

      const like = await Post.update(
        {
          _id: id,
        },
        { $push: { likes: req.body.userId } }
      );
      res.status(200).json("like");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default postController;
