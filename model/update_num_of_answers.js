const db = require('../db');


const updateNumOfAnswers = (userID, callback) => {
  const sql = `UPDATE users 
                SET num_of_answers = num_of_answers + 1
                WHERE users.id=${userID}`
                
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateNumOfAnswers;