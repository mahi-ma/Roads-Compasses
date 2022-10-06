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

const Post = sequelize.define("post", {
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    
    updated_at: {
        type: DataTypes.DATEONLY,
    },
});



sequelize.sync().then(() => {
    console.log("Post table created sucessfully")
}).catch((error) => {
    console.error('Unable to create table : ', error);
})


export default Post;