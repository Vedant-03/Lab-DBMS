const express=require("express");
const mysql=require("mysql2");
const bodyparser=require("body-parser"); 
var database=require('./database');

var router = express.Router();


router.use(bodyparser.urlencoded({extended:true}));

router.get("/", (req,res) => {
    query = `SELECT * FROM query;`;
    database.query(query, (error, rows) => {
        if(error)   throw error;
        // console.log(rows[0].i_id);
        // console.log(rows[0].image);
        // console.log(rows[0].model);
        // console.log(rows[0].quantity);
        // console.log(rows[0].desc);
        if(!error){
            res.render("Queries", {data: rows});
        }
    })
});

router.post('/', (req,res) => {
    var auth = req.body.author;
    var desc = req.body.desc;

    var indate = new Date();
    var date = indate.getFullYear() + "-" + (indate.getMonth()+1) + "-" + indate.getDate();
    console.log(`INSERT INTO query (author, descr, in_date) VALUES("${auth}", "${desc}", "${date}")`)
    if(auth && desc)
    {
        query = `INSERT INTO query (author, descr, in_date) VALUES("${auth}", "${desc}", "${date}")`;
        console.log(`INSERT INTO query (author, descr, in_date) VALUES("${auth}", "${desc}", "${date}")`)
        database.query(query, (error, data) => {
            res.redirect("/");
            res.end();
        });
    }
    else
    {
        res.send('Please Enter Author and Query Description');
        res.end();
    }

});

module.exports = router;