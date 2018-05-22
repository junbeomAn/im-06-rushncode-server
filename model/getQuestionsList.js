const db = require("../db");

const questionsList = (type, page, callback) => {
  const numOfQuestionPerPage = 20;
  let orderBy = '';
  if(type === 'normal') {
    orderBy = 'id';
  } else if(type === 'view') {
    orderBy = 'view';
  } else if(type === 'good') {
    orderBy = 'good';
  } else if(type === 'reward') {
    orderBy = 'reward';
  }

  const sql = `SELECT questions.*, 
                      users.username, 
                      GROUP_CONCAT(tags.tag) AS tags,
                      (SELECT COUNT(*) FROM questions) AS countQuestions,
                      (SELECT COUNT(*) FROM answers WHERE answers.questionID=questions.id) AS countAnswers 
                  FROM questions 
                LEFT JOIN q_tag 
                ON questions.id = q_tag.questionID 
                LEFT JOIN tags 
                ON q_tag.tagID = tags.id 
                INNER JOIN users 
                ON userID = users.id
                WHERE questions.deleted=0 
                GROUP BY questions.id
                ORDER BY ${orderBy} DESC LIMIT ${0 + ((page - 1) * numOfQuestionPerPage)}, ${numOfQuestionPerPage}`;
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
