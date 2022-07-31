import Post from "../models/post.js";
import Comment from "../models/comment.js";
import cloudinary from "../database/cloudinary.js";
const postController = {
  getAll: async (req, res) => {
    const posts = await Post.find().sort({ $natural: -1 });
    res.json(posts);
  },
  findById: async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json(post);
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
    const postUpdate = await Post.updateOne(
      {
        _id: id,
      },
      { $push: { comments: newComment } }
    );
    res.json(postUpdate);
  },
  handleLike: async (req, res) => {
    const id = req.params.id; //id post
    const post = await Post.findById(id);
    const isexist = post?.likes.find((id) => id.toString() === req.body.userId);
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
  },
};
export default postController;
