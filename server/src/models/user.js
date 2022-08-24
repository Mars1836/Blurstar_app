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
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
export default User;
