const db = require('../db');


const updateView = (target, callback) => {
  const sql = `SELECT choose_answers FROM users WHERE id = ${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateView;