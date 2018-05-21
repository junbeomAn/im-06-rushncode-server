const db = require('../db');


const getNumOfQuestions = (userID, callback) => {
  const sql = `SELECT num_of_questions FROM users WHERE id = ${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getNumOfQuestions;