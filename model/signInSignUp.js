var db = require('../db/index');



exports.checkUsername = (target, callback) => {
    var sql = `SELECT * FROM users WHERE email='${target}'`;

    db.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log(result);
            callback(null, result);
        }
    });
}

exports.saveUser = (target, callback) => {
    var sql = `INSERT INTO users(email, username, password) 
                VALUES('${target.email}', '${target.username}', '${target.password}')`;

    db.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log(result);
            callback(null, 'good');
        }
    });
}