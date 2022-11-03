import  jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config.js';
// import dotenv from "dotenv";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "User not authorised"
    });
  }
};

export default auth;