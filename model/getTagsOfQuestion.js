const db = require("../db");

const tagsOfQuestion = (callback) => {
  const sql = `SELECT tags.tag, q_tag.questionID 
                  FROM questions 
                INNER JOIN users 
                  ON userID = users.id 
                INNER JOIN q_tag 
                  ON questions.id = q_tag.questionID 
                INNER JOIN tags 
                  ON tags.id = q_tag.tagID`;
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

module.exports = tagsOfQuestion;