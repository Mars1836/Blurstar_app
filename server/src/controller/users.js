import User from "../models/user.js";
import Post from "../models/post.js";
import CryptoJS from "crypto-js";
import cloudinary from "../database/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
const userController = {
  findAll: async (req, res) => {
    try {
      const users = await User.find({}).select("-email -password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res, next) => {
    const newUser = { ...req.body };
    try {
      const isEmailExist = await User.findOne({ email: newUser.email });
      const isUsernameExist = await User.findOne({
        username: newUser.username,
      });
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
      await saveUser.save(function (err) {
        if (err) {
          res.json(err);
          return;
        }
        res.status(200).json(newUser);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findById: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select("-email -password");
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUsersByListId: async (req, res) => {
    const ids = req.body.list;
    try {
      const users = await User.find({ _id: { $in: ids } }).select(
        "-email -password"
      );
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findExceptId: async (req, res) => {
    const id = req.params.id;
    const name = req.query.name || "";
    if (id) {
      let users;
      try {
        users = await User.find({ _id: { $ne: id } }).select(
          "-password -email"
        );
        let filter = users.filter((user) => {
          return user.name.includes(name);
        });
        res.json(filter);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.json("Can't get userid");
    }
  },
  getUsersLike: async (req, res) => {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    const users = await User.find({ _id: { $in: post.likes } }).select(
      "-email -password"
    );
    res.status(200).json(users);
  },
  findByUsername: async (req, res) => {
    const username = req.params.username;
    try {
      let user = await User.find({ username: username }).select(
        "-email -password"
      );
      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  uploadAvatar: async (req, res) => {
    const image = req.body.image;
    const userId = req.params.userid;
    await cloudinary.uploader.upload(
      image,
      {
        folder: "Blurstar",
      },
      async function (error, result) {
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
          res.status(200).json(result.url);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    );
  },
  getFollowing: async (req, res) => {
    const userFollow = req.body.userFollowId;
    const userGetFollow = req.body.userGetFollowId;
    try {
      const isFollowed = await User.findOne({
        _id: userFollow,
        following: { $elemMatch: { $eq: userGetFollow } },
      });
      if (!isFollowed) {
        await User.updateOne(
          { _id: userFollow },
          {
            $push: { following: userGetFollow },
          }
        );
        await User.updateOne(
          { _id: userGetFollow },
          {
            $push: { followers: userFollow },
          }
        );
        res.status(200).json({ following: userGetFollow });
        return;
      }
      res.status(200).json("b");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUnFollowing: async (req, res) => {
    try {
      const userFollow = req.body.userFollowId;
      const userGetFollow = req.body.userGetFollowId;
      const isFollowed = await User.findOne({
        _id: userFollow,
        following: { $elemMatch: { $eq: userGetFollow } },
      });
      if (isFollowed) {
        await User.updateOne(
          { _id: userFollow },
          { $pull: { following: { $eq: userGetFollow } } }
        );
        await User.updateOne(
          { _id: userGetFollow },
          { $pull: { followers: { $eq: userFollow } } }
        );
        res.status(200).json({ following: userGetFollow });
        return;
      } else {
        res.status(200).json("you haven't followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addNotification: async (req, res) => {
    try {
      const notification = {
        ...req.body,
        seen: false,
        createAt: new Date(),
        id: uuidv4(),
      };
      console.log(notification);
      const id = req.params.id;
      const noti = await User.updateOne(
        { _id: id },
        {
          $push: {
            notifications: { $each: [notification], $slice: -15, $position: 0 },
          },
        }
      );
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json(new Error(error));
    }
  },
  seenNotification: async (req, res) => {
    const userId = req.body.userId;
    const notifications = req.body.notifications;
    const update = await User.updateMany(
      {
        _id: userId,
      },
      { "notifications.$[filter].seen": true },
      {
        arrayFilters: [{ "filter.id": { $eq: notifications } }],
      }
    );
    res.status(200).json(update);
  },
};
export default userController;
