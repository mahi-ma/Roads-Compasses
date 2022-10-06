import dbConfig from "../db.config.js";

import { Sequelize } from "sequelize";
import Post from "./post.model.js";
import User from "./user.model.js";
import PostTag from "./post_tag.model.js";
import FilterTag from "./tag.model.js";
import Category from "./category.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = new Post(sequelize, Sequelize);
db.user = new User(sequelize, Sequelize);
db.category = new Category(sequelize, Sequelize);
db.postTag = new PostTag(sequelize, Sequelize);
db.filterTag= new FilterTag(sequelize, Sequelize); 

export default db;


