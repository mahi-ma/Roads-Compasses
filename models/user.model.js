
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
            allowNull: false
        },
        profile_picture: {
            type: DataTypes.STRING
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
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
    });

    User.hasMany(Posts(sequelize,Sequelize),{
        foreignKey: "author_id",
        sourceKey: "id",
    });

    sequelize.sync().then(() => {
        console.log("User table is successfully created")

    }).catch((error) => {
        console.error("Faliure in creating table: ", error);
    })
    return User;

}

export default Users;