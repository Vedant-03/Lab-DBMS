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
    var lb = req.body.lab;
    var room = req.body.room_no;
    var image = req.body.imgs;
    var mdl = req.body.model;
    var quantity = req.body.qty;
    var about = req.body.desc;

    var lbb = lb.toLowerCase();
    lbb = lbb + "_" + room;
    console.log(lbb);
    
    query = `INSERT INTO ${lbb} (image, model, quantity, descr) VALUES ("${image}", "${mdl}", ${quantity}, "${about}")`;
    console.log(`INSERT INTO ${lbb} (image, model, quantity, descr) VALUES ("${image}", "${mdl}", ${quantity}, "${about}")`);
    database.query(query, (error, data) => {
        res.redirect("/");
        // res.send("Item Inserted");
        res.end();
    });
});


module.exports = router;