import db from "../models/index.js";

const Posts = db.posts;
const Op = db.Sequelize.op;

const createPost = async (req, res) => {
    try {
        let { title, subtitle, body, author_id, images, category_id, tag_ids } = req.body;
        images = JSON.stringify(images);
        tag_ids = JSON.stringify(tag_ids);
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
            `INSERT INTO Posts (images,title,subtitle,body,author_id,createdAt,updatedAt,category_id,tag_ids,updated_at) values ('${images}','${title}','${subtitle}','${body}',${author_id},CURDATE(),CURDATE(),${category_id},'${tag_ids}',CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newpost[0],
            title,
            images: JSON.parse(images),
            subtitle,
            body,
            author_id,
            category_id,
            tag_ids: JSON.parse(tag_ids)
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
        images = JSON.stringify(images);
        tag_ids = JSON.stringify(tag_ids);
        const { id } = req.params;

        const sql = `UPDATE posts
        SET title = '${title}',
        subtitle = '${subtitle}',
        body = '${body}',
        author_id = ${author_id},
        images = '${images}',
        category_id = ${category_id},
        tag_ids = '${tag_ids}',
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
            tag_ids: JSON.parse(tag_ids),
            images: JSON.parse(images)
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