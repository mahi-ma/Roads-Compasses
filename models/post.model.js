import { DataTypes } from "sequelize";
import PostCategories from "./post_category.model.js";
import PostTags from "./post_tag.model.js";

const Posts = (sequelize, Sequelize) => {

    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tag_ids: {
            type: DataTypes.STRING, 
            get: function() {
                return JSON.parse(this.getDataValue('tag_ids'));
            }, 
            set: function(val) {
                return this.setDataValue('tag_ids', JSON.stringify(val));
            }
        },
        updated_at: {
            type: DataTypes.DATEONLY,
        },
    });

    Post.hasMany(PostTags(sequelize,Sequelize),{
        foreignKey: "post_id",
        sourceKey: "id",
    })
    Post.hasMany(PostCategories(sequelize,Sequelize),{
        foreignKey: "post_id",
        sourceKey: "id",
    })

    sequelize.sync().then(() => {
        console.log("Post table created sucessfully")
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    })
    return Post;
}


export default Posts;