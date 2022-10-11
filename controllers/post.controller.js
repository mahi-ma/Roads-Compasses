import db from "../models/index.js";

const Posts = db.posts;
const Op = db.Sequelize.op;

const createPost = async (req, res) => {
    try{
        const { title, subtitle, body, author_id } = req.body;
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
            `INSERT INTO Posts (title,subtitle,body,author_id,createdAt,updatedAt,updated_at) values ('${title}','${subtitle}','${body}',${author_id},CURDATE(),CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newpost[0],
            title,
            subtitle,
            body,
            author_id,
        });
    }
    catch(e){
        res.status(500).send({
            message: e.message
        })
    }
}

const updatePostByID = async (req, res) => {
    try{
        const { title, subtitle, body, author_id } = req.body;
        const { id } = req.params;
    
        const sql = `UPDATE posts
        SET title = '${title}',
        subtitle = '${subtitle}',
        body = '${body}',
        author_id = ${author_id},
        updatedAt = CURDATE(),
        updated_at = CURDATE()
        WHERE id = ${id};`
    
        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.UPDATE
        })
        res.send({
            id: result[0],
            title,
            subtitle,
            body,
            author_id,
        });
    }
    catch(e){
        res.status(500).send({
            message: e.message
        })
    }

}

const deletePostById = async (req, res) => {
    try{
        const {id} = req.params;
        const sql = `DELETE from posts where id=${id}`;
        const result = await db.sequelize.query(sql,{
            type: db.sequelize.QueryTypes.DELETE
        })
            res.send({
                message: "Deleted Successfully"
            });
        return;
    }
    catch(e){
        res.status(500).send({
            message: e.message
        })
    }
}

const getAllPosts = async (req, res) => {
    try{
        const posts = await db.sequelize.query(`SELECT * from Posts`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send(posts);
    }
    catch(e){
        res.status(500).send({
            message: e.message
        })
    }
}

const getPostById = async (req, res) => {
    try{
        const id = req.params.id;
        const selectedPost = await db.sequelize.query(`SELECT * from Posts where id=${id}`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({
            ...selectedPost[0]
        });
        return res;
    }
    catch(e){
        res.status(500).send({
            message: e.message
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