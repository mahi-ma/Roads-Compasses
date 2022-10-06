import postTagController from "../controllers/postTag.controller.js";
import express from "express";

var router = express.Router();

//get all posts
router.get("/", postTagController.getAllPosts);

export default router;