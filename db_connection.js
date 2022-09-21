import mysql from "mysql";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
 'rcApp',
 'root',
 '123456789',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});