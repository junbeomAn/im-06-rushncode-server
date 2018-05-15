const db = require("../db");

const questionsList = (callback) => {
  const sql = `SELECT questions.*, 
                      users.username, 
                      GROUP_CONCAT(tags.tag) AS tags,
                      (select count(*) from answers where answers.questionID=questions.id) AS countAnswers 
                  FROM questions 
                LEFT JOIN q_tag 
                ON questions.id = q_tag.questionID 
                LEFT JOIN tags 
                ON q_tag.tagID = tags.id 
                INNER JOIN users 
                ON userID = users.id
                GROUP BY questions.id`;
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