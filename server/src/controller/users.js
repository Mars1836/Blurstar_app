import User from "../models/user.js";
import Post from "../models/post.js";
import CryptoJS from "crypto-js";
import cloudinary from "../database/cloudinary.js";
const userController = {
  findAll: async (req, res) => {
    const users = await User.find({}).select("name username avatar gender");
    // users.select("name");
    res.json(users);
  },
  create: async (req, res, next) => {
    const newUser = { ...req.body };
    const isEmailExist = await User.findOne({ email: newUser.email });
    const isUsernameExist = await User.findOne({ username: newUser.username });
    if (isEmailExist) {
      res.status(409).json("Your email was exist");
      return;
    }
    if (isUsernameExist) {
      res.status(409).json("Your username was exist");
      return;
    }
    newUser.password = CryptoJS.AES.encrypt(
      newUser.password,
      process.env.PW_SECRET_KEY
    ).toString();
    const saveUser = new User(newUser);
    saveUser.save(function (err) {
      if (err) {
        res.json(err);
        return;
      }
      res.status(200).json(newUser);
    });
  },
  findById: async (req, res) => {
    const id = req.params.id;
    if (id) {
      const user = await User.findById(id).select(
        "name username avatar gender"
      );
      res.json(user);
    } else {
      res.json("Can't get userid");
    }
  },
  findExceptId: async (req, res) => {
    const id = req.params.id;
    const name = req.query.name || "";
    if (id) {
      let users;
      try {
        users = await User.find({ _id: { $ne: id } }).select(
          "name username avatar gender"
        );
      } catch (error) {
        res.status(500).json(error);
      }
      let filter = users.filter((user) => {
        return user.name.includes(name);
      });
      res.json(filter);
    } else {
      res.json("Can't get userid");
    }
  },
  getUsersLike: async (req, res) => {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    const users = await User.find({ _id: { $in: post.likes } }).select(
      "name username avatar gender"
    );
    res.status(200).json(users);
  },
  findByUsername: async (req, res) => {
    const username = req.params.username;
    try {
      let user = await User.find({ username: username }).select(
        "name username avatar gender"
      );
      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  uploadAvatar: async (req, res) => {
    const image = req.body.image;
    const userId = req.params.userid;
    console.log("image");
    await cloudinary.uploader.upload(image, async function (error, result) {
      if (error) {
        return res.status(500).json(error);
      }
      try {
        const user = await User.updateOne(
          { _id: userId },
          {
            $set: {
              avatar: result.url,
            },
          }
        );
      } catch (err) {
        res.status(500).json(err);
      }
    });
  },
};
export default userController;
