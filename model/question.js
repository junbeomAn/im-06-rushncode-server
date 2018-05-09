var db = require('../db/index');

var sql = `SELECT * FROM users`;

connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("add childReplies table");
});