import { DataTypes } from "sequelize";

const PostCategories = (sequelize, Sequelize) => {
    const PostCategory = sequelize.define("postCategory", {
        post_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });

    sequelize.sync().then(() => {
        console.log("PostCatgory table is successfully created");
    }).catch((error) => {
        console.error("Failure in creating table: ", error);
    })

    return PostCategory;
}

export default PostCategories;