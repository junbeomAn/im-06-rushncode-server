const db = require('../db');

const getProfileInfo = (userID, callback) => {
  const sql = `SELECT num_of_answers, choose_answers, num_of_questions, image, total_reward, state_comment
                FROM users 
                WHERE id = ${userID}`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

module.exports = getProfileInfo;
