import { DataTypes } from "sequelize";
import PostTags from "./post_tag.model.js";

const Tags = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Tag.hasMany(PostTags(sequelize,Sequelize),{
        foreignKey: "tag_id",
        sourceKey: "id",
    })

    sequelize.sync().then(() => {
        console.log("User table is successfully created")

    }).catch((error) => {
        console.error("Faliure in creating table: ", error);
    })
    return Tag;
}

export default Tags;