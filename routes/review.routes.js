import reviewController from "../controllers/review.controller.js";
import express from "express";

import auth from "../middlewares/auth.js";


const reviewRouter = app => {
    var router = express.Router();

    //get all reviews
    app.get("/reviews", reviewController.getAllReviews);

    //create review
    app.post("/reviews", auth, reviewController.createReview);

    //update review
    app.put("/reviews/:id", auth, reviewController.updateReviewById);

    //delete review
    app.delete("/reviews/:id", auth, reviewController.deleteReviewById);

    //get review by id
    app.get("/reviews/:id", reviewController.getReviewById);

    app.use("/reviews", router);
}

export default reviewRouter;