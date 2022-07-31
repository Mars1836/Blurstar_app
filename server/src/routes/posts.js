import express from "express";
import postController from "../controller/post.js";
const postRouter = express.Router();
postRouter.get("/", postController.getAll);
postRouter.post("/", postController.create);
postRouter.get("/find/:id", postController.findById);
postRouter.patch("/addcomment/:id", postController.addComment);
postRouter.patch("/like/:id", postController.handleLike);
export default postRouter;
