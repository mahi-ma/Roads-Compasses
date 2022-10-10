import db from "../models/index.js";

const Posts = db.posts;
const Op = db.Sequelize.op;

const createPost = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Post title cannot be empty"
        });
        return;
    }
    if (!req.body.body) {
        res.status(400).send({
            message: "Post body cannot be empty"
        });
        return;
    }
    const newpost = await db.sequelize.query(
        `INSERT INTO Post (title,subtitle,body,author,category_id,updated_at) values ('${req.body.title}','${req.body.subtitle}','${req.body.body}','${req.body.author_id}',datetime('now'))`
        , {
            replacements: { id: req.user.id },
            type: db.sequelize.QueryTypes.INSERT
    });
    if(newpost){
        res.status(200).json({
            status:200,
            message: "Post created successfully",
            post : newpost
        })
    }
}

const updatePostByID = (req, res) => {

}

const deletePostById = (req, res) => {

}

const getAllPosts = async (req, res) => {
    const posts = await db.sequelize.query(`SELECT * from Post`);
    if(posts){
        res.status(200).json({
            status:200,
            message: "Posts retrieved successfully",
            posts : posts
        })
    }
    else{
        res.status(500).send({
            message: "Server error"
        })
    }
}

const getPostById = async (req, res) => {
    const id = req.params.id;
    const selectedPost = await db.sequelize.query(`SELECT * from Post where id='${id}'`);
    if(selectedPost){
        res.status(200).json({
            status:200,
            message: "Post retrieved successfully",
            post : selectedPost
        })
    }
    else{
        res.status(500).send({
            message: "Server error"
        })
    }
}

export default {
    createPost,
    getAllPosts,
    updatePostByID,
    deletePostById,
    getPostById
}