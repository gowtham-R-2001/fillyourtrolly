const mysql = require('mysql');
const pool = mysql.createPool({
    user: "root",
    password: "",
    host: "localhost",
    database: "fillyourtrolly",
});

module.exports = pool; 