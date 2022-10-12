import { DataTypes } from "sequelize";
import PostTags from "./post_tag.model.js";

const FilterTags = (sequelize, Sequelize) => {
    const FilterTag = sequelize.define("filterTag", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    });

    FilterTag.hasMany(PostTags(sequelize,Sequelize),{
        foreignKey: "tag_id",
        sourceKey: "id",
    })

    sequelize.sync().then(() => {
        console.log("User table is successfully created")

    }).catch((error) => {
        console.error("Faliure in creating table: ", error);
    })
    return FilterTag;
}

export default FilterTags;