const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT,
    email VARCHAR(255), 
    username VARCHAR(255), 
    password VARCHAR(255),     
    total_reward INTEGER DEFAULT 0, 
    verified BOOLEAN DEFAULT FALSE, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("add users table");
});