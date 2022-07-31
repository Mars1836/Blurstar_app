import Comment from "../models/comment";
const commentController = {
  create: (req, res) => {
    const newComment = new Comment({
      author: req.body.author,
      content: req.body.content,
    });
  },
};
