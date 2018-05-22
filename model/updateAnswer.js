const db = require('../db');


const updateQuestion = (target, callback) => {
  const { body, questionID } = target;
  const sql = `UPDATE answers SET body = '${body}', updated_at = now() WHERE answers.id = ${answerID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = updateQuestion;