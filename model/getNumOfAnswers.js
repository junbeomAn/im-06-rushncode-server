const db = require('../db');


const getNumOfAnswers = (userID, callback) => {
  const sql = `SELECT num_of_answers FROM users WHERE id = ${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getNumOfAnswers;