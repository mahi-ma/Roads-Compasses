import { DataTypes} from "sequelize";

const Posts = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATEONLY,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Post;
};

export default Posts;