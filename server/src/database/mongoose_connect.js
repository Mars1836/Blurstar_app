import mongoose from "mongoose";
const conn = {
  connect: async () => {
    await mongoose.connect("mongodb://localhost:27017/blurstar_app");
  },
};
export default conn;
