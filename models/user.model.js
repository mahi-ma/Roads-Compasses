
import { DataTypes } from "sequelize";
import Posts from "./post.model.js";

const Users = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
        },
        designation: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        phone_no: {
            type: DataTypes.STRING,
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },

    });

    User.hasMany(Posts(sequelize,Sequelize));

    sequelize.sync().then(() => {
        console.log("User table is successfully created")

    }).catch((error) => {
        console.error("Faliure in creating table: ", error);
    })
    return User;

}

export default Users;