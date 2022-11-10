const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'lab_database',
    user : 'root',
    password : 'root123',
    multipleStatements : true
});

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log('MySQL Database connected successfully');
    }
})

module.exports = connection;