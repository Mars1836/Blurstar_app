import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { Server } from "socket.io";
import { verifyToken } from "./middlewares/auth.js";
//api
import groupRouter from "./routes/groups.js";
import messageRouter from "./routes/messages.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import imageRouter from "./routes/images.js";
import resetRouter from "./routes/reset.js";
//database
import conn from "./database/mongoose_connect.js";
import commentRouter from "./routes/comment.js";
import path from "path";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve(path.join(""));

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

conn.connect();
app.use(cors(corsOption));
app.use(express.json({ extended: true, limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/images", verifyToken, imageRouter);
app.use("/api/comments", verifyToken, commentRouter);
app.use("/api/groups", verifyToken, groupRouter);
app.use("/api/posts", verifyToken, postRouter);
app.use("/api/users", verifyToken, userRouter);
app.use("/api/messagses", verifyToken, messageRouter);
app.use("/auth", authRouter);
app.use("/api/reset", resetRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("set-user-id", (userId) => {
    socket.join(userId);
  });
  socket.on("click", () => {
    io.sockets.emit("sv-click");
  });
  socket.on("notification", (to, data) => {
    socket.to(to).emit("get-notification", data);
  });
  socket.on("up-post", (post) => {
    socket.broadcast.emit("get-post", post);
  });
  socket.on("like-post", (userId, postId) => {
    socket.broadcast.emit("get-like-post", userId, postId);
    socket.to(["63072a771513e67be021c830"]).emit("test", userId);
  });
  socket.on("unlike-post", (userId, postId) => {
    socket.broadcast.emit("get-unlike-post", userId, postId);
  });

  socket.on("comment", (comment, postId) => {
    socket.broadcast.emit("get-comment", comment, postId);
    socket.broadcast.emit("get-notify", {
      type: "COMMENT_POST",
      postid: postId,
      userid: comment.userid,
    });
  });
  socket.on("reply", (comment, commentId) => {
    io.sockets.emit("get-reply", comment, commentId);
  });
  socket.on("remove-comment", (commentId) => {
    io.sockets.emit("get-remove-comment", commentId);
  });
  socket.on("follow-user", (user, mainUser) => {
    io.sockets.emit("get-follow-user", user, mainUser);
  });
  socket.on("unfollow-user", (user, mainUser) => {
    io.sockets.emit("get-unfollow-user", user, mainUser);
  });
});
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log("server is running");
});
