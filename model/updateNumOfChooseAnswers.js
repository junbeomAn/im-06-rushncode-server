const db = require('../db');


const updateNumOfChooseAnswers = (userID, callback) => {
  const sql = `UPDATE users
                SET choose_answers = choose_answers + 1
                WHERE id = ${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = updateNumOfChooseAnswers;