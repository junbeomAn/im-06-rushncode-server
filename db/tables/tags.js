const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS tags (
    id INTEGER AUTO_INCREMENT,
    tag VARCHAR(255), 
    PRIMARY KEY(id)
  )`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("add tags table");
});