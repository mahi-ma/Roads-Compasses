import postController from "../controllers/post.controller.js";
import express from "express";

const postRouter = app => {
    var router = express.Router();

    //get all posts
    app.get("/posts", postController.getAllPosts);
    
    //create post
    app.post("/posts", postController.createPost);
    
    //update post
    app.put("/posts/:id", postController.updatePostByID);
    
    //delete post
    app.delete("/posts/:id", postController.deletePostById);
    
    //get post by id
    app.get("/posts/:id", postController.getPostById);

    app.use("/posts",router);
}

export default postRouter;