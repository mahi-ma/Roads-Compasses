import categoryController from "../controllers/category.controller.js";
import express from "express";

const categoryRouter = app => {
    var router = express.Router();

    //get all categories
    app.get("/categories", categoryController.getAllCategories);

    //create category
    app.post("/categories", categoryController.createCategory);

    //update category
    app.put("/categories/:id", categoryController.updateCategoryById);

    //delete category
    app.delete("/categories/:id", categoryController.deleteCategoryById);

    //get category by id
    app.get("/categories/:id", categoryController.getCategoryById);

    app.use("/categories", router);
}

export default categoryRouter;