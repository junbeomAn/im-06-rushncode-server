const db = require('../db');


const updateQuestion = (target, callback) => {
  const { title, body, questionID } = target;
  const sql = ``;

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