import express from "express";
const groupRouter = express.Router();
groupRouter.get("/", (req, res) => {
  res.send("groups");
});
export default groupRouter;
