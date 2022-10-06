import dbConfig from "../db.config.js";

import { Sequelize } from "sequelize";
import Posts from "./post.model.js";
import Users from "./user.model.js";
import PostTags from "./post_tag.model.js";
import FilterTags from "./tag.model.js";
import Categories from "./category.model.js";

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

db.post = Posts(sequelize, Sequelize);
db.user = Users(sequelize, Sequelize);
db.category = Categories(sequelize, Sequelize);
db.postTag = PostTags(sequelize, Sequelize);
db.filterTag = FilterTags(sequelize, Sequelize);

export default db;


