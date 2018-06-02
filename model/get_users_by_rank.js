const db = require('../db');



const getUsersByRank = (callback) => {
  const sql = `SELECT users.username, users.total_reward, users.image FROM users`;

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