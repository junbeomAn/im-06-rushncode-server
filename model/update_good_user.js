const db = require('../db');


const updateGoodUser = (questionID, email, callback) => {
  const sql = `INSERT INTO q_user (questionID, userID)
                  SELECT * FROM (SELECT ${questionID}, (SELECT id FROM users WHERE email='${email}')) AS tmp
                  WHERE NOT EXISTS 
                    (SELECT * FROM q_user WHERE questionID=${questionID} AND userID=(SELECT id FROM users WHERE email='${email}'))`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateGoodUser;