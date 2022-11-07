var mysql = require("mysql2");
require("dotenv").config();

var connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: process.env.password,
    database: 'lab_database'
});

module.exports = connection;