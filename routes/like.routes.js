import likeController from "../controllers/like.controller.js";
import express from "express";

import auth from "../middlewares/auth.js";


const likeRouter = app => {
    var router = express.Router();

    //get like count
    app.get("/likes", likeController.getLikesCount);

    //create like
    app.post("/likes", auth, likeController.createLike);

    //delete a like
    app.delete("/likes/:id", auth, likeController.deleteLikeById);

    app.use("/likes", router);
}

export default likeRouter;