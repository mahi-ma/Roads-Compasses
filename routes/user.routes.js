import userController from "../controllers/user.controller.js";
import express from "express";

var router = express.Router();

//get all posts
router.get("/", userController.getAllPosts);

export default router;