import categoryController from "../controllers/category.controller.js";
import express from "express";

import auth from "../middlewares/auth.js";


const categoryRouter = app => {
    var router = express.Router();

    //get all categories
    app.get("/categories", auth, categoryController.getAllCategories);

    //create category
    app.post("/categories", auth, categoryController.createCategory);

    //update category
    app.put("/categories/:id", auth, categoryController.updateCategoryById);

    //delete category
    app.delete("/categories/:id", auth, categoryController.deleteCategoryById);

    //get category by id
    app.get("/categories/:id", auth, categoryController.getCategoryById);

    app.use("/categories", router);
}

export default categoryRouter;