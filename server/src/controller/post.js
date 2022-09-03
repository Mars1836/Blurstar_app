import Post from "../models/post.js";
import Comment from "../models/comment.js";
import cloudinary from "../database/cloudinary.js";
import User from "../models/user.js";
import commentController from "./comment.js";
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
  findList: async (req, res) => {
    const list = req.body.listId;
    try {
      const posts = await Post.find({ _id: { $in: list } });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
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
    newPost.save(async function (err) {
      if (err) {
        res.json(err);
        return;
      }
      try {
        await User.updateOne(
          { _id: newPost.author },
          {
            $push: { posts: newPost._id },
          }
        );
      } catch (error) {
        res.json(error);
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
    const commentM = await commentController.create(newComment);
    try {
      await Post.updateOne(
        {
          _id: id,
        },
        {
          $push: {
            comments: {
              $each: [newComment._id],
              $position: 0,
            },
          },
        }
      );
      res.status(200).json(commentM);
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
        await Post.updateOne({ $pull: { likes: req.body.userId } });
        res.json("dislike");
        return;
      }

      const like = await Post.updateOne(
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
  remove: async (req, res) => {
    const postid = req.params.id;
    try {
      const post = await Post.findOne({ _id: postid });
      await post.deleteOne();

      res.status(200).json("remove post");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default postController;
