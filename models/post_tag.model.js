import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'rcApp',
    'root',
    '123456789',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const PostTag = sequelize.define("postTag",{
    post_id:{
        type: DataTypes.STRING,
    },
    tag_id:{
        type: DataTypes.STRING,
    }
});

sequelize.sync().then(() =>{
    console.log("PostTag table is successfully created");
}).catch((error) =>{
    console.error("Failure in creating table: ", error);
})


export default PostTag;