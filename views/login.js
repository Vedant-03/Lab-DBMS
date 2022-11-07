const express=require("express");
const mysql=require("mysql2");
const bodyparser=require("body-parser"); 
var connection=require('../login_database');

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname+"/HTML/index.html");
});

app.post("/", (req,res) => {
    res.sendFile(__dirname+"/HTML/index.html");
});

app.get("/login",(req,res) => {
    res.sendFile(__dirname+"/HTML/login.html");
});

app.post("/login",(req,res) => {
    const email=req.body.email;
    const password=req.body.password; 
    connection.query(
        'SELECT * FROM admin WHERE email=(?)',
        [email],
        (err,results) => {
            if(err) {
                console.log(err);            
            }
            if(results.length>0) {
                if(results[0].password==password) {                                        
                    res.redirect("/");
                } 
            }
        }
    ) 
});

app.listen(3000,() => {
    console.log('Server on board');
    connection.connect((err) => {
        if(err){ throw err;}
        console.log('Database connected');
    });
});