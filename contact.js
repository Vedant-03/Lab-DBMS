const express=require("express");
const bodyparser=require("body-parser");

var router = express.Router();


router.use(bodyparser.urlencoded({extended:true}));

router.get("/", (req,res) => {
    res.render("contact");
});

module.exports = router;