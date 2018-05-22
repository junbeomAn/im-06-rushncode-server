const db = require('../db');



const getChAnswers = (target, callback) => {
  const sql = `SELECT 
                users.username AS username,
                users.id AS userID,
                childanswers.id AS cID, 
                childanswers.body AS cBody, 
                childanswers.updated_at AS cTime,
                childanswers.answerID AS aID
              FROM answers 
              INNER JOIN childanswers 
              ON answers.id=childanswers.answerID
              INNER JOIN users
              ON users.id=childanswers.userID
              WHERE answers.questionID=${target}`;

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

module.exports = getChAnswers;