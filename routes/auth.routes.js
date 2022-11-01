import authController from "../controllers/auth.controller.js";
import express from "express";

const authRouter = app => {
    var router = express.Router();

    //get auth token for superadmin
    app.post("/auth-token", authController.generateAuthToken);

    app.use("/auth-token", router);
}

export default authRouter;