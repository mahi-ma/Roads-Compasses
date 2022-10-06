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

const FilterTag = sequelize.define("filterTag",{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING
    }
    
});

sequelize.sync().then(() =>{
    console.log("User table is successfully created")

}).catch((error)=>{
    console.error("Faliure in creating table: ",error);
})

export default FilterTag;