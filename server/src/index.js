import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
//api
import groupRouter from "./routes/groups.js";
import messageRouter from "./routes/messages.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import imageRouter from "./routes/images.js";
//database
import conn from "./database/mongoose_connect.js";

const app = express();
const PORT = process.env.PORT || 4000;
const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
conn.connect();
app.use(cors(corsOption));
app.use(express.json({ extended: true, limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/images", imageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/messagses", messageRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log("server is running");
});
