const db = require('../db');


const updateNumOfQuestions = (userID, callback) => {
  const { title, body, questionID } = target;
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

module.exports = updateNumOfQuestions;