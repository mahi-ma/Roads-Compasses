const express = require('express')
const mysql = require('mysql')

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
});

//connecting the db
db.connect((error) =>{
    if(error){
        throw error;
    }
    console.log("MySQL is connected");
});


//creating DB
app.get('/createdb',(request, response) => {
    let sql = 'CREATE DATABASE roadsAndCompasses';
    db.query(sql, (error, result) =>{
        if(error) throw error;
        console.log(result);
        response.send("Database is created successfully");
    });
});

app.get('createpost', (request, response) =>{
    let sql = 'CREATE TABLE post(title varchar(20) NOT NULL, subtitle varchar(20), author varchar(20), release_date date, body varchar(50))';
    db.query(sql, (error, result) =>{
        if(error) throw error;
        console.log(result);
        response.send("Table is created......");
    });
});




app.listen('3000',() =>{
    console.log("Server started on port 3000");
});

//npm install -g nodemon  (this is used to run the script without refreshing the page)
//nodemon

