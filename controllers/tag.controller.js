import db from "../models/index.js";

const Tags = db.tag;
const Op = db.Sequelize.op;

const createTag = async (req,res) => {
    try{
        const { name } = req.body;
        if (!req.body.name) {
            res.status(400).send({
                message: "Name field cannot be empty"
            });
            return;
        }
        const newtag = await db.sequelize.query(
            `INSERT INTO Tags (name,createdAt,updatedAt) values ('${name}',CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newtag[0],
            name
        });
    }
    catch (e){
        res.status(500).send({
            message: e.message
        })
    }
}

const updateTagById = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const sql = `UPDATE tags
        SET name = '${name}',
        updatedAt = CURDATE()
        WHERE id = ${id};`

        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.UPDATE
        })
        res.send({
            id: result[0],
            name
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const deleteTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from tags where id=${id}`;
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


const getAllTags = async (req,res) => {
    try {
        const tags = await db.sequelize.query(`SELECT * from tags`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send(tags);
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getTagById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedTag = await db.sequelize.query(`SELECT * from Tags where id=${id}`, {
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
    createTag,
    getAllTags,
    updateTagById,
    deleteTagById,
    getTagById
}