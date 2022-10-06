
import {DataTypes, DATE, Sequelize} from "sequelize";
import mysql from "mysql";

// const mysql = require('mysql')

export const sequelize = new Sequelize(
    'rcApp',
    'root',
    '123456789',
    {
        host: 'localhost',
        dialect: 'mysql',
    }

);

const User = sequelize.define("user",{
    user_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
    },
    designation:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    phone_no:{
        type: DataTypes.STRING,
    },
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    
});

sequelize.sync().then(() =>{
    console.log("User table is successfully created")

}).catch((error)=>{
    console.error("Faliure in creating table: ",error);
})

export default User;