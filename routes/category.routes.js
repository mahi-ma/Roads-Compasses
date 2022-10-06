import categoryController from "../controllers/category.controller.js";
import express from "express";

var router = express.Router();

//get all posts
router.get("/", categoryController.getAllPosts);

export default router;