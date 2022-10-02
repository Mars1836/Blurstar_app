import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    gender: { type: String },
    following: [mongoose.Types.ObjectId],
    followers: [mongoose.Types.ObjectId],
    saved: [mongoose.Types.ObjectId],
    posts: [mongoose.Types.ObjectId],
    notifications: [
      {
        id: { type: String, unique: true },
        userId: { type: mongoose.Types.ObjectId, required: true },
        postId: { type: mongoose.Types.ObjectId },
        commentId: { type: mongoose.Types.ObjectId },
        type: { type: String },
        createAt: { type: Date, default: new Date() },
        seen: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
export default User;
