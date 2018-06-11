const db = require('../db');


const updateNumOfQuestions = (userID, callback) => {
  const sql = `UPDATE users 
                SET num_of_questions = num_of_questions + 1
                WHERE users.id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = updateNumOfQuestions;