import { DataTypes,Sequelize} from "sequelize";

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

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