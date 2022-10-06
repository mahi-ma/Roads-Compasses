import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
    'rcApp',
    'root',
    '123456789',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const Category = sequelize.define("category",{
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING
    }
});

sequelize.sync().then(()=>{
    console.log("Category table has been successfully created");
}).catch((error)=>{
    console.error("Failure in creating table:  ", error);
})

export default Category;