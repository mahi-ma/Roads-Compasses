import db from "../models/index.js";

const Posts = db.postTag;
const Op = db.Sequelize.op;

const create = (req,res) => {

}

const getAllPosts = (req,res) => {

}

export default {
    create,
    getAllPosts
}