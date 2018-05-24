const db = require('../db');



const getAnswers = (questionID, userID, callback) => {
  let str = '';
  if(questionID && !userID) {
    str = `answers.questionID=${questionID}`;
  } else {
    str = `answers.userID=${userID}`;
  }
  const sql = `SELECT 
                  users.username AS username, 
                  users.id AS userID, 
                  questions.id AS qID,
                  questions.title AS qTitle,
                  questions.reward AS qReward,
                  answers.id AS aID, 
                  answers.body AS aBody, 
                  answers.updated_at AS aTime, 
                  answers.good AS aGood, 
                  answers.picked AS picked
                FROM answers 
              INNER JOIN users 
                ON users.id=answers.userID
              INNER JOIN questions
                ON questions.id=answers.questionID
              WHERE answers.deleted=0 AND ${str}`;

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

