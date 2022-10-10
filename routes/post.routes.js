import postController from "../controllers/post.controller.js";
import express from "express";

const postRouter = app => {
    var router = express.Router();

    //get all posts
    router.get("/", postController.getAllPosts);
    
    //create post
    router.post("/", postController.createPost);
    
    //update post
    router.put("/:id", postController.updatePostByID);
    
    //delete post
    router.delete("/:id", postController.deletePostById);
    
    //get post by id
    router.get("/:id", postController.getPostById);

    app.use("/posts",router);
}

export default postRouter;