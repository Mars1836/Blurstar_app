import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import { Server } from "socket.io";
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
const server = http.createServer(app);
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
app.use("*", (req, res) => {
  res.json("endpoint not found");
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("click", () => {
    io.sockets.emit("sv-click");
  });
  socket.on("up-post", (post) => {
    io.sockets.emit("get-post", post);
  });
  socket.on("comment", (comment) => {
    io.sockets.emit("get-comment", comment);
  });
});
server.listen(PORT, () => {
  console.log("server is running");
});
