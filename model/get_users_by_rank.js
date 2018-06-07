const db = require('../db');



const getUsersByRank = (callback) => {
  const sql = `SELECT users.id, users.username, users.total_reward, users.image, users.state_comment
                FROM users 
                ORDER BY total_reward DESC`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, 'no result');
      }
    }
  });
}

module.exports = getUsersByRank;