import db from "../models/index.js";
import { getStringVal } from "../utilities/index.js";

const Posts = db.posts;
const Op = db.Sequelize.op;

const createPost = async (req, res) => {
    try {
        let { title, subtitle, body, author_id, images, category_id, tag_ids } = req.body;
        images = JSON.stringify(images);
        tag_ids = JSON.stringify(tag_ids);
        if(!req.body.author_id){
            res.status(400).send({
                message: "Author id is necessary to create a post"
            });
            return;
        }
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
            `INSERT INTO Posts (images,title,subtitle,body,author_id,createdAt,updatedAt,category_id,tag_ids,updated_at) values (${getStringVal(images,true)},'${title}',${getStringVal(subtitle)},'${body}',${getStringVal(author_id)},CURDATE(),CURDATE(),${getStringVal(category_id)},${getStringVal(tag_ids,true)},CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newpost[0],
            title,
            images: images ? JSON.parse(images) : [],
            subtitle,
            body,
            author_id,
            category_id,
            tag_ids: tag_ids ? JSON.parse(tag_ids) : []
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const updatePostById = async (req, res) => {
    try {
        let { title, subtitle, body, author_id, images, category_id, tag_ids } = req.body;
        if(Array.isArray(images) && images.length==0){
            images = undefined;
        }
        if(Array.isArray(tag_ids) && tag_ids.length==0){
            tag_ids = undefined;
        }
        images = JSON.stringify(images);
        tag_ids = JSON.stringify(tag_ids);
        const { id } = req.params;

        const sql = `UPDATE posts
        SET title = '${title}',
        subtitle = ${getStringVal(subtitle)},
        body = '${body}',
        author_id = ${getStringVal(author_id)},
        images = ${getStringVal(images,true)},
        category_id = ${getStringVal(category_id)},
        tag_ids = ${getStringVal(tag_ids,true)},
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
            category_id,
            tag_ids: tag_ids ? JSON.parse(tag_ids) : [],
            images: images ? JSON.parse(images) : []
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from posts where id=${id}`;
        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.DELETE
        })
        res.send({
            message: "Deleted Successfully"
        });
        return;
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await db.sequelize.query(`SELECT * from Posts`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send(posts);
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedPost = await db.sequelize.query(`SELECT * from Posts where id=${id}`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({
            ...selectedPost[0]
        });
        return res;
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

export default {
    createPost,
    getAllPosts,
    updatePostById,
    deletePostById,
    getPostById
}