const mysql = require('mysql');
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: false
};

const pool = mysql.createPool(config);

function connectDB() {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("1" + err);
                return;
            }

            console.log("Connected to database!");
            // Don't forget to release the connection when done using it
            connection.release();
        });
    } catch (e) {
        console.error("2" + e);
    };
};

function closeDB() {
    try {
        pool.end(err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Database connection closed.");
        });
    } catch (e) {
        console.error(e);
    };
}

module.exports = { connectDB, closeDB, pool };
