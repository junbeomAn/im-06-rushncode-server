const db = require('../db');


const updateGood = (questionID, email, callback) => {
  const sql = `UPDATE questions 
                SET good=good+1 
                WHERE questions.id=${questionID} 
                AND NOT EXISTS (
                  SELECT * FROM q_user 
                  WHERE q_user.questionID=${questionID} 
                  AND q_user.userID=(
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

module.exports = updateGood;

// UPDATE (questions INNER JOIN q_user ON questions.id = q_user.questionID) SET good=good+1 WHERE id=4;


// UPDATE (questions INNER JOIN q_user ON questions.id = q_user.questionID) SET good=good+1 WHERE questions.id=6 NOT EXISTS (SELECT * FROM q_user WHERE questionID=6 AND userID=(SELECT id FROM users WHERE email='jhg@rushncode.com'));