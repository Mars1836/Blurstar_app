import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  let user;
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      user = jwt.verify(authorization, process.env.TOKEN_SECRET_KEY);
      req.user = user;
      return next();
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(500).json({
      error: "you have to authorization",
    });
  }
};
export { verifyToken };
