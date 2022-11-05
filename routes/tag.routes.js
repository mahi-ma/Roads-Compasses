import express from "express";
import tagController from "../controllers/tag.controller.js";
import auth from "../middlewares/auth.js";

const tagRouter = app => {

    var router = express.Router();

    //get all tags
    app.get("/tags",tagController.getAllTags);

    //create tag
    app.post("/tags", auth,tagController.createTag);

    //update tag
    app.put("/tags/:id", auth,tagController.updateTagById);

    //delete tag
    app.delete("/tags/:id", auth,tagController.deleteTagById);

    //get tag by id
    app.get("/tags/:id",tagController.getTagById);

    app.use("/tags", router);
}

export default tagRouter;