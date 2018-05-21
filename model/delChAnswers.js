const db = require('../db');


const delChAnswer = (chanswerID, callback) => {
  const { title, body, questionID } = target;
  const sql = `UPDATE childanswers 
                SET deleted=1 
                WHERE childanswers.id=${chanswerID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = delChAnswer;