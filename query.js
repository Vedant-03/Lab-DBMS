const express=require("express");
const mysql=require("mysql2");
const bodyparser=require("body-parser"); 
var database=require('./database');

var router = express.Router();


router.use(bodyparser.urlencoded({extended:true}));

router.get("/", (req,res) => {
    res.render("Queries");
});

router.post('/', (req,res) => {
    var auth = req.body.author;
    var desc = req.body.desc;

    var indate = new Date();
    var date = indate.getFullYear() + "-" + (indate.getMonth()+1) + "-" + indate.getDate();

    if(auth && desc)
    {
        query = `INSERT INTO query (author, descr, in_date) VALUES("${auth}", "${desc}", "${date}")`;
        // console.log(`INSERT INTO query (author, descr, in_date) VALUES("${auth}", "${desc}", "${date}")`)
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