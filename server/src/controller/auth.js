import User from "../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const auth = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      const hashPassword = user.password;
      const bytes = CryptoJS.AES.decrypt(
        hashPassword,
        process.env.PW_SECRET_KEY
      );
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword === password) {
        const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET_KEY, {
          expiresIn: "3h",
        });
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESHTOKEN_SECRET_KEY
        );
        res.json({
          token,
          refreshToken,
        });
      } else {
        res.status(401).json("username or password is wrong");
      }
    } else {
      res.status(401).json("username or password is wrong");
    }
  },
  refreshToken: () => {},
  tokenAuth: (req, res) => {
    let user;
    const authorization = req.headers.authorization;
    if (authorization) {
      try {
        user = jwt.verify(authorization, process.env.TOKEN_SECRET_KEY);
        res.json({ user });
      } catch (err) {
        res.status(400).json(err);
      }
    } else {
      res.status(500).json({
        error: "you have to authorization",
      });
    }
  },
};
export default auth;
