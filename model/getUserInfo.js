const db = require('../db');



const checkUser = (userID, callback) => {
  const sql = `SELECT * FROM users WHERE id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null, null);
    } else {
      if (result.length !== 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = checkUser;