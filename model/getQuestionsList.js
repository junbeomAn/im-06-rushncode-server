const db = require("../db");

const questionsList = (callback) => {
  const sql = `SELECT questions.*, 
                      users.username, 
                      (select count(*) from answers where answers.questionID=questions.id) AS countAnswers 
                FROM questions 
                INNER JOIN users 
                ON userID = users.id`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      //console.log(result);
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports = questionsList;