const mysql = require('mysql');

const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'products_catalog'
});

databaseConnection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = databaseConnection;