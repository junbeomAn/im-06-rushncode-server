const db = require('../db');


const delQuestion = (questionID, callback) => {
  const sql = `UPDATE questions 
                SET deleted=1 
                WHERE questions.id=${questionID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = delQuestion;