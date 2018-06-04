const db = require('../db');


const updateAnswerGoodUser = (answerID, email, callback) => {
  const sql = `INSERT INTO a_user (answerID, userID)
                  SELECT * FROM (SELECT ${answerID}, (SELECT id FROM users WHERE email='${email}')) AS tmp
                  WHERE NOT EXISTS 
                    (SELECT * FROM a_user WHERE answerID=${answerID} AND userID=(SELECT id FROM users WHERE email='${email}'))`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateAnswerGoodUser;