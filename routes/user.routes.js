import userController from "../controllers/user.controller.js";
import express from "express";

const tagRouter = app => {
    var router = express.Router();

    //get all users
    app.get("/users", userController.getAllUsers);

    //create a user
    app.post("/users", userController.createUser);

    //update user 
    app.put("/users/:id", userController.updateUserById);

    //delete user
    app.delete("/users/:id", userController.deleteUserById);

    //get user by id
    app.get("/users/:id", userController.getUserById);

    app.use("/users", router);
}

export default tagRouter;