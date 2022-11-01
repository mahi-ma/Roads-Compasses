import postController from "../controllers/post.controller.js";
import express from "express";
import auth from "../middlewares/auth.js";

const postRouter = app => {
    var router = express.Router();

    //get all posts
    app.get("/posts", auth, postController.getAllPosts);
    
    //create post
    app.post("/posts", auth, postController.createPost);
    
    //update post
    app.put("/posts/:id", auth, postController.updatePostById);
    
    //delete post
    app.delete("/posts/:id",auth, postController.deletePostById);
    
    //get post by id
    app.get("/posts/:id", auth, postController.getPostById);

    app.use("/posts",router);
}

export default postRouter;