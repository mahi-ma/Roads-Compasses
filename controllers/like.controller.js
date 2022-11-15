import db from "../models/index.js";

const Likes = db.review;
const Op = db.Sequelize.op;

const createLike = async (req,res) => {
    try{
        const { user_id,post_id } = req.body;
        if (!req.body.post_id) {
            res.status(400).send({
                message: "Post id field is mandatory to review a post"
            });
            return;
        }
        const newlike = await db.sequelize.query(
            `INSERT INTO Likes (user_id,post_id,createdAt,updatedAt) values ('${user_id}','${post_id}',CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newlike[0],
            user_id,
            post_id
        });
    }
    catch (e){
        res.status(500).send({
            message: e.message
        })
    }
}

const deleteLikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from likes where id=${id}`;
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

const getLikesCount = async (req,res) => {
    try {
        const likes = await db.sequelize.query(`SELECT * from likes`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({count:likes.length});
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

export default {
    createLike,
    getLikesCount,
    deleteLikeById
}