import userController from "../controllers/user.controller.js";
import express from "express";
import auth from "../middlewares/auth.js";

const tagRouter = app => {
    var router = express.Router();

    //get all users
    app.get("/users", auth,userController.getAllUsers);

    //create a user
    app.post("/users", auth,userController.createUser);

    //update user 
    app.put("/users/:id", auth,userController.updateUserById);

    //delete user
    app.delete("/users/:id", auth,userController.deleteUserById);

    //get user by id
    app.get("/users/:id",auth, userController.getUserById);

    app.use("/users", router);
}

export default tagRouter;