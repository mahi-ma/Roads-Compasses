import postController from "../controllers/post.controller.js";
import express from "express";

var router = express.Router();

//get all posts
router.get("/", postController.getAllPosts);

export default router;