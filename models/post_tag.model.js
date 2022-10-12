import { DataTypes } from "sequelize";

const PostTags = (sequelize, Sequelize) => {
    const PostTag = sequelize.define("postTag", {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    sequelize.sync().then(() => {
        console.log("PostTag table is successfully created");
    }).catch((error) => {
        console.error("Failure in creating table: ", error);
    })

    return PostTag;
}

export default PostTags;