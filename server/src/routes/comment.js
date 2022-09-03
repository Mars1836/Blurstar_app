import express from "express";
import commentController from "../controller/comment.js";
const commentRouter = express.Router();
commentRouter.get("/", commentController.getAllComment);
commentRouter.get("/find/:id", commentController.getComment);
commentRouter.post("/findlist", commentController.getListComment);
commentRouter.post("/addcomment/:id", commentController.addComment);
commentRouter.delete("/:id", commentController.remove);
export default commentRouter;
