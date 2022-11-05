import dbConfig from "../db.config.js";
import { DataTypes, Sequelize } from "sequelize";

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

const Tag =  sequelize.define("tag", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Post = sequelize.define("post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    images: {
        type: DataTypes.JSON,
        default: [],
        get() {
            return JSON.parse(JSON.stringify(this.getDataValue('images')));
        },
        set(val) {
           this.setDataValue('images',JSON.stringify(val));
        }
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
        allowNull: true,
        default: null
    },
    tag_ids: {
        type: DataTypes.JSON, 
        default: [],
        get() {
            return JSON.parse(JSON.stringify(this.getDataValue('tag_ids')));
        },
        set(val) {
           this.setDataValue('tag_ids',JSON.stringify(val));
        }
    },
    updated_at: {
        type: DataTypes.DATEONLY,
    },
});

const User =  sequelize.define("user", {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING
    },
    designation: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    phone_no: {
        type: DataTypes.STRING,
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

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

const PostCategory = sequelize.define("postCategory", {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
});

const Category =  sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

Category.hasMany(PostCategory, {
    foreignKey: "category_id",
    sourceKey: "id",
})

Category.hasMany(Post, {
    foreignKey: "category_id",
    sourceKey: "id",
})

Tag.hasMany(PostTag,{
    foreignKey: "tag_id",
    sourceKey: "id",
})

Post.hasMany(PostTag,{
    foreignKey: "post_id",
    sourceKey: "id",
})
Post.hasMany(PostCategory,{
    foreignKey: "post_id",
    sourceKey: "id",
})

User.hasMany(Post,{
    foreignKey: "author_id",
    sourceKey: "id",
});

sequelize.sync().then(() => {
    console.log("Tables created successfully")

}).catch((error) => {
    console.error("Faliure in creating table: ", error);
})


export default {
    sequelize: sequelize,
    Sequelize,
    post: Post,
    user: User,
    category: Category,
    postTag: PostTag,
    tag: Tag,
    postCategory: PostCategory
};


