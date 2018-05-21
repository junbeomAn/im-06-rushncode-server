const db = require('../db');


const getNumOfChooseAnswers = (userID, callback) => {
  const sql = `SELECT choose_answers FROM users WHERE id = ${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getNumOfChooseAnswers;