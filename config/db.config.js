const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'products_catalog'
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;