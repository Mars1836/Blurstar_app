import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    avatar: { type: String },
    manager: { type: String, required: true },
    name: { type: String, required: true },
    members: { type: Array, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
const Group = mongoose.model("group", groupSchema);
export default Group;
