import filterTagController from "../controllers/filterTag.controller.js";
import express from "express";

var router = express.Router();

//get all posts
router.get("/", filterTagController.getAllPosts);

export default router;