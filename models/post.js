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

sequelize.sync().then(() => {
    console.log("Post table created sucessfully")
}).catch((error) => {
    console.error('Unable to create table : ', error);
})