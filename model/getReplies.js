const db = require('../db');



const getReplies = (target, callback) => {
  const sql = `SELECT 
                replies.id AS rID, 
                replies.body AS rBody, 
                replies.updated_at AS rTime
              FROM questions 
              INNER JOIN replies 
              ON questions.id=replies.questionID
              WHERE questions.id=${target}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null, null);
    } else {
      //console.log(result);
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = getReplies;