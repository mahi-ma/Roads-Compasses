import postController from "../controllers/post.controller";
import express from "express";

const postRoutes = app => {
    var router = express.Router();

    //get all posts
    router.get("/posts", postController.getAllPosts);

    app.use('/api', router);
}

export default postRoutes;