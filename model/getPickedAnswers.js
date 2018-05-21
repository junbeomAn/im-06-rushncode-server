const db = require('../db');


const getPickedAnswers = (userID, callback) => {
  const sql = `SELECT COUNT(*) AS pickedAnswers FROM answers WHERE userID=${userID} AND picked=1`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getPickedAnswers;