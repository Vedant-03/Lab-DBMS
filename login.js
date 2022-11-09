const express=require("express");
const mysql=require("mysql2");
const bodyparser=require("body-parser"); 
var database=require('./database');

var router = express.Router();


router.use(bodyparser.urlencoded({extended:true}));

router.get("/", (req,res) => {
    res.render("login");
});

// router.post("/", (req,res,next) => {
//     res.render("login");
//     next();
// });


router.post('/', (req, res) => {

    var user_email_address = req.body.email;

    var user_password = req.body.password;

    if(user_email_address && user_password)
    {
        query = `
        SELECT * FROM admin 
        WHERE email = "${user_email_address}"
        `;

        database.query(query, (error, data) => {

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].password == user_password)
                    {
                        req.session.email = data[count].email;

                        res.redirect("/");
                    }
                    else
                    {
                        res.send('Incorrect Password');
                    }
                }
            }
            else
            {
                res.send('Incorrect Email Address');
            }
            res.end();
        });
    }
    else
    {
        res.send('Please Enter Email Address and Password Details');
        res.end();
    }

});

module.exports = router;