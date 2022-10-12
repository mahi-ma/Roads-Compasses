import { DataTypes } from "sequelize";
import PostCategories from "./post_category.model.js";
import Posts from "./post.model.js";

const Categories = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        }
    });

    Category.hasMany(PostCategories(sequelize,Sequelize),{
        foreignKey: "category_id",
        sourceKey: "id",
    })

    Category.hasMany(Posts(sequelize,Sequelize),{
        foreignKey: "category_id",
        sourceKey: "id",
    })

    sequelize.sync().then(() => {
        console.log("Category table has been successfully created");
    }).catch((error) => {
        console.error("Failure in creating table:  ", error);
    })

    return Category;
}

export default Categories;