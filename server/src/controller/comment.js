import Comment from "../models/comment.js";
import postController from "./post.js";
import mongoose from "mongoose";
const commentController = {
  create: async (comment) => {
    const newComment = await new Comment(comment);
    newComment.save((err, comment) => {
      if (err) {
        res.status(500).json(err);
      }
    });
    return newComment;
  },
  getAllComment: async (req, res) => {
    const comment = await Comment.find();
    res.json(comment);
  },
  getListComment: async (req, res) => {
    const listId = req.body.listId;
    const sort = req.body.sort || -1;
    const limit = req.body.limit;
    const pageCount = req.body.pageCount;
    if (!pageCount) {
      const comments = await Comment.find({ _id: { $in: listId } }).sort({
        $natural: sort,
      });
      res.json(comments);
      return;
    } else {
      const comments = await Comment.find({ _id: { $in: listId } })
        .sort({
          $natural: sort,
        })
        .skip((pageCount - 1) * limit)
        .limit(limit);
      res.json(comments);
      return;
    }
  },
  getComment: async (req, res) => {
    const comment = await Comment.find({ _id: req.params.id });
    res.json(comment);
  },
  addComment: async (req, res) => {
    const newComment = await new Comment({
      content: req.body.content,
      userid: req.body.userid,
    });
    newComment.save((err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
    await Comment.updateOne(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            $each: [newComment._id],
            $position: 0,
          },
        },
      }
    );
    res.status(200).json(newComment);
  },

  remove: async (req, res) => {
    const commentId = req.params.id;
    const postId = req.body.postId;
    const commentParentId = req.body.commentParentId;
    console.log(commentParentId);
    console.log(commentId);
    try {
      const doc = await Comment.findOne({ _id: commentId });
      await doc.deleteOne();

      if (commentParentId) {
        try {
          const a = await Comment.updateOne(
            { _id: commentParentId },
            {
              $pull: {
                comments: mongoose.Types.ObjectId(commentId),
              },
            }
          );

          console.log(a);
        } catch (error) {
          console.log(error);
        }
      }
      postController.removeComment(postId, commentId);
      res.status(200).json("delete comment");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
export default commentController;
