import express from "express";
import { v2 as cloudinary } from "cloudinary";
const imageRouter = express.Router();
cloudinary.config({
  cloud_name: "dq9gkla2h",
  api_key: "137929614639116",
  api_secret: "OeZz2JUk4RLfsTpFG2au9fW9YWU",
});
imageRouter.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

// image upload API
imageRouter.post("/image-upload", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});
export default imageRouter;
