import db from "../models/index.js";

const Users = db.user;
const Op = db.Sequelize.op;

const createUser = async (req,res) => {
    try{
        const { user_name, name, profile_picture, designation, description, phone_no } = req.body;
        if (!req.body.user_name) {
            res.status(400).send({
                message: "User name field cannot be empty"
            });
            return;
        }
        if (!req.body.name) {
            res.status(400).send({
                message: "Name field cannot be empty"
            });
            return;
        }
        const newuser = await db.sequelize.query(
            `INSERT INTO Users (user_name,name,profile_picture,designation,description,phone_no,createdAt,updatedAt) values ('${user_name}','${name}',${profile_picture || null},${designation || null},${description || null},${phone_no || null},CURDATE(),CURDATE())`, {
            type: db.sequelize.QueryTypes.INSERT
        });
        res.send({
            id: newuser[0],
            user_name,
            name,
            phone_no,
            profile_picture,
            description,
            designation
        });
    }
    catch (e){
        res.status(500).send({
            message: e.message
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const { user_name, name, profile_picture, designation, description, phone_no } = req.body;
        const { id } = req.params;

        const sql = `UPDATE users
        SET user_name = ${user_name},
        name = ${name},
        profile_picture = ${profile_picture || null},
        designation = ${designation|| null},
        updatedAt = CURDATE(),
        description= ${description|| null},
        phone_no=  ${phone_no|| null}
        WHERE id = ${id};`

        const result = await db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.UPDATE
        })
        res.send({
            id: result[0],
            user_name,
            name,
            phone_no,
            profile_picture,
            description,
            designation
        });
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }

}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE from users where id=${id}`;
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


const getAllUsers = async (req,res) => {
    try {
        const users = await db.sequelize.query(`SELECT * from Users`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send(users);
    }
    catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectedUser = await db.sequelize.query(`SELECT * from Users where id=${id}`, {
            type: db.sequelize.QueryTypes.SELECT
        });
        res.send({
            ...selectedUser[0]
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
    createUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById
}