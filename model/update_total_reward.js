const db = require('../db');


const updateTotalReward = (reward, userID, callback) => {
  const sql = `UPDATE users
                SET total_reward = total_reward + ${reward}
                WHERE id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log(result);
      callback(null, 'good');
    }
  });
}

module.exports = updateTotalReward;