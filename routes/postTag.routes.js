import postTagController from "../controllers/postTag.controller.js";
import express from "express";
import auth from "../middlewares/auth.js";

var router = express.Router();

//get all posts
router.get("/",postTagController.getAllPosts);

export default router;