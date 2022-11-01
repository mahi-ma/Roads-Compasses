
import db from "../models/index.js";
import { getStringVal } from "../utilities/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config.js";

const generateAuthToken = async (req,res) => {
    try{
        let jwtSecretKey = JWT_SECRET_KEY;
        let data = {
            time: Date(),
            username: req.body.username,
            password: req.body.password
        }
        const token = jwt.sign(data, jwtSecretKey);
        res.send(token);
    }
    catch(e) {
        res.status(500).send({
            message: e.message
        })
    }
}

export default {
    generateAuthToken
}