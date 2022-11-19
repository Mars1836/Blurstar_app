import mongoose from "mongoose";
const conn = {
  connect: async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  },
};
export default conn;
