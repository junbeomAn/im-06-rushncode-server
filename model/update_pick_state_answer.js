const db = require('../db');

const updatePickStateAnswer = (answerID, callback) => {
  const sql = `UPDATE answers
                SET picked = 1
                WHERE answers.id=${answerID}`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
};

module.exports = updatePickStateAnswer;
