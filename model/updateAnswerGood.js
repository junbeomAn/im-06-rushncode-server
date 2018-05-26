const db = require('../db');


const updateAnswerGood = (answerID, email, callback) => {
  const sql = `UPDATE answers 
                SET good=good+1 
                WHERE answers.id=${answerID} 
                AND NOT EXISTS (
                  SELECT * FROM a_user 
                  WHERE a_user.answerID=${answerID} 
                  AND a_user.userID=(
                    SELECT users.id 
                    FROM users 
                    WHERE users.email='${email}'))`
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateAnswerGood;