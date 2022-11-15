import db from "../models/index.js";

const Reviews = db.review;
const Op = db.Sequelize.op;

const createReview = async (req,res) => {
    try{
        const { user_id,body,post_id } = req.body;
        if (!req.body.post_id) {
            res.status(400).send({
                message: "Post id field is mandatory to review a post"
            });
            return;
        }
        const newreview = await db.sequelize.query(
            `INSERT INTO Reviews (user_id,body,post_id,createdAt,updatedAt) values ('${user_id}','${body}','${post_id}',CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newreview[0],
            user_id,
            body,
            post_id
        });
    }
    catch (e){
        res.status(500).send({
            message: e.message
        })
    }
}

//only review body can be updated
const updateReviewById = async (req, res) => {
    try {
        const { body } = req.body;
        const { id } = req.params;

        const sql = `UPDATE reviews
        SET body = '${body}',
        updatedAt = CURDATE()
        WHERE id = ${id};`

        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.UPDATE
        })
        res.send({
            id: result[0],
            body
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const deleteReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from reviews where id=${id}`;
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

const getAllReviews = async (req,res) => {
    try {
        const reviews = await db.sequelize.query(`SELECT * from reviews`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send(reviews);
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedTag = await db.sequelize.query(`SELECT * from reviews where id=${id}`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({
            ...selectedTag[0]
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
    createReview,
    getAllReviews,
    updateReviewById,
    deleteReviewById,
    getReviewById
}