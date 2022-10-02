import express from "express";
import postController from "../controller/post.js";
const postRouter = express.Router();
postRouter.get("/", postController.getAll);
postRouter.post("/", postController.create);
postRouter.get("/find/:id", postController.findById);
postRouter.get("/recommend", postController.getRecommendPostId);
postRouter.patch("/addcomment/:id", postController.addComment);
postRouter.patch("/like/:id", postController.like);
postRouter.patch("/unlike/:id", postController.unlike);
postRouter.post("/findlist", postController.findList);
postRouter.delete("/:id", postController.remove);

export default postRouter;
