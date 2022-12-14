var express = require('express');
// const { query } = require('./database');
// const { response } = require('./app');
var router = express.Router();

var database = require('./database');


router.get("/phy", (req,res) => {
    query = `SELECT * FROM phy_1; SELECT * FROM phy_2;`;
    database.query(query, (error, rows) => {
        if(error)   throw error;
        // console.log(rows[0].i_id);
        // console.log(rows[0].image);
        // console.log(rows[0].model);
        // console.log(rows[0].quantity);
        // console.log(rows[0].desc);
        if(!error){
            res.render("phy-lab", {data: rows});
        }
    })
});

router.get("/chem", (req,res) => {
    query = `SELECT * FROM chem_1; SELECT * FROM chem_2;`;
    database.query(query, (error, rows) => {
        if(error)   throw error;
        // console.log(rows[0].i_id);
        // console.log(rows[0].image);
        // console.log(rows[0].model);
        // console.log(rows[0].quantity);
        // console.log(rows[0].desc);
        if(!error){
            res.render("chem-lab", {data: rows});
        }
    })
});

router.get("/cs", (req,res) => {
    query = `SELECT * FROM cs_1; SELECT * FROM cs_2; SELECT * FROM cs_3;`;
    database.query(query, (error, rows) => {
        if(error)   throw error;
        // console.log(rows[0].i_id);
        // console.log(rows[0].image);
        // console.log(rows[0].model);
        // console.log(rows[0].quantity);
        // console.log(rows[0].desc);
        if(!error){
            res.render("cs-lab", {data: rows});
        }
    })
});

router.get('/', function(req, res, next) {
    res.redirect('/');
});

module.exports = router;