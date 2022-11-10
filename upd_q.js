const express=require("express");
const mysql=require("mysql2");
const bodyparser=require("body-parser"); 
var database=require('./database');

var router = express.Router();


router.use(bodyparser.urlencoded({extended:true}));

router.get("/", (req,res) => {
    res.render("home");
});

router.post('/', (req,res) => {
    var qid = req.body.qid;
    query = `UPDATE query SET solved = 1 WHERE q_id = ${qid}`;
    database.query(query, (error,data) => {
        res.redirect("/");
        res.end();
    });
});


module.exports = router;