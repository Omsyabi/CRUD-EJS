//module 
const mysql = require('mysql');

//connection to database
const a = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ui_3_6_26"
});

//connect to app.js
module.exports = a;