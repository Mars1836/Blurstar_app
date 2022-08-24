import express from "express";
import reset from "../controller/reset.js";
const resetRouter = express.Router();
resetRouter.delete("/users", reset.user);
resetRouter.delete("/posts", reset.post);
export default resetRouter;
