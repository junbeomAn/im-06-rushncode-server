const db = require('../db');


const delAnswer = (answerID, callback) => {
  const sql = `UPDATE answers 
                SET deleted=1 
                WHERE answers.id=${answerID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = delAnswer;