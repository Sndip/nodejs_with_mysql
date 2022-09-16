const express = require('express');
const mysql = require('mysql2');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'123456',
    database:'nodemysql',
    port:'3308'
});

//Connect
db.connect((err)=>{
    if(err) { console.log(err); };
    console.log('Mysql connection started');
})

const app = express();

//Create DB
app.get('/createdb', (req,res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result)=>{
        if(err) console.log(err);
        console.log(result);
        res.send('Database Created...');
    })
})

//Create table
app.get('/createposttable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err,result)=>{
        if(err){ console.log(err); }
        console.log(result);
        res.send('Posts table created...');
    })
})

// Insert post
app.get('/addpost1',(req,res)=>{
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql,post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    })
})

// Select post
app.get('/getposts',(req,res)=>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Posts fetched...');
    })
})

app.listen('3000',()=>{
    console.log('Server started on port 3000');
});