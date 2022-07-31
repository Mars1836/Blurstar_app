import express from "express";
import auth from "../controller/auth.js";
import userController from "../controller/users.js";
const authRouter = express.Router();
authRouter.post("/login", auth.login);
authRouter.post("/token", auth.tokenAuth);
authRouter.post("/register", userController.create);
authRouter.post("/refreshtoken", auth.refreshToken);
export default authRouter;
