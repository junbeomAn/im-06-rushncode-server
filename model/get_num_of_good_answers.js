const db = require('../db');


const getNumOfGoodAnswers = (target, callback) => {
  const { title, body, questionID } = target;
  const sql = `SELECT SUM(good)  AS numOfGoodAnswers
                FROM answers 
                INNER JOIN users 
                ON users.id=answers.userID 
                WHERE users.id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
}

module.exports = getNumOfGoodAnswers;