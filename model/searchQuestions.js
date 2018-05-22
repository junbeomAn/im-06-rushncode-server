const db = require('../db');


const searchQuestions = (string, page, callback) => {
  let str = '';
  let tmpArr = string.split(' ');
  const numOfQuestionPerPage = 5;
  for(let i = 0;i < tmpArr.length;i++) {
    if(i !== 0) {
      str += ' AND '
    }
    str += `questions.title LIKE '%${tmpArr[i]}%'`
  }
  const sql = `SELECT questions.*, 
                users.username, 
                GROUP_CONCAT(tags.tag) AS tags,
                (SELECT COUNT(*) FROM questions WHERE ${str}) AS countSearchResult,
                (SELECT COUNT(*) FROM answers WHERE answers.questionID=questions.id) AS countAnswers  
                FROM questions 
              LEFT JOIN q_tag 
                ON questions.id = q_tag.questionID 
              LEFT JOIN tags 
                ON q_tag.tagID = tags.id 
              INNER JOIN users 
                ON userID = users.id
              WHERE questions.deleted=0 
                AND ${str}
              GROUP BY questions.id
              ORDER BY id DESC LIMIT ${0 + ((page - 1) * numOfQuestionPerPage)}, ${numOfQuestionPerPage}`;
 
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      if(result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = searchQuestions;




