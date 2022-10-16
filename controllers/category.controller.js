import db from "../models/index.js";
import { getStringVal } from "../utilities/index.js";

const Posts = db.category;
const Op = db.Sequelize.op;

const createCategory = async (req,res) => {
    try{
        const { name, description } = req.body;
        if (!req.body.name) {
            res.status(400).send({
                message: "Name field cannot be empty"
            });
            return;
        }
        const newcategory = await db.sequelize.query(
            `INSERT INTO Categories (name,description,createdAt,updatedAt) values ('${name}',${getStringVal(description)},CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newcategory[0],
            name,
            description
        });
    }
    catch (e){
        res.status(500).send({
            message: e.message
        })
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const sql = `UPDATE categories
        SET name = '${name}',
        description = ${getStringVal(description)},
        updatedAt = CURDATE()
        WHERE id = ${id};`

        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.UPDATE
        })
        res.send({
            id: result[0],
            name,
            description
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from categories where id=${id}`;
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


const getAllCategories = async (req,res) => {
    try {
        const tags = await db.sequelize.query(`SELECT * from categories`, {
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

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedCategory = await db.sequelize.query(`SELECT * from Categories where id=${id}`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({
            ...selectedCategory[0]
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
    createCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById
}