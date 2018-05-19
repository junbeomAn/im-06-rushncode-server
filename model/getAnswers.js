const db = require('../db');



const getAnswers = (target, callback) => {
  const sql = `SELECT 
                users.username AS username,
                answers.id AS aID, 
                answers.body AS aBody, 
                answers.updated_at AS aTime, 
                answers.good AS aGood
              FROM answers 
              INNER JOIN users 
              ON users.id=answers.userID
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

module.exports = getAnswers;

