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

router.post('/upd', (req,res) => {
    var lb = req.body.lab_u;
    var room = req.body.room_no_u;
    var itid = req.body.item_id;
    var image = req.body.imgs_u;
    var mdl = req.body.model_u;
    var quantity = req.body.qty_u;
    var about = req.body.desc_u;

    var lbb = lb.toLowerCase();
    lbb = lbb + "_" + room;
    console.log(lbb);
    
    if(itid && lb && room){
        if(quantity <= 0){
            query = `DELETE FROM ${lbb} WHERE i_id = ${itid}`;
            database.query(query, (error, data) => {});
        }
        else{
            if(image){
                query = `UPDATE ${lbb} SET image = "${image}" WHERE i_id = ${itid}`;
                database.query(query, (error, data) => {});
            }
            if(mdl){
                query = `UPDATE ${lbb} SET model = "${mdl}" WHERE i_id = ${itid}`;
                database.query(query, (error, data) => {});
            }
            if(quantity){
                query = `UPDATE ${lbb} SET quantity = "${quantity}" WHERE i_id = ${itid}`;
                database.query(query, (error, data) => {});
            }
            if(about){
                query = `UPDATE ${lbb} SET descr = "${about}" WHERE i_id = ${itid}`;
                database.query(query, (error, data) => {});
            }
        }
        res.redirect("/");
        res.end();
    }
});

module.exports = router;