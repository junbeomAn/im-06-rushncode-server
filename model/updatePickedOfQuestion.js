const db = require('../db');


const updatePickedOfQuestion = (questionID, callback) => {
  const sql = `UPDATE questions 
                SET exist_picked_ans = 1
                WHERE questions.id=${questionID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = updatePickedOfQuestion;

