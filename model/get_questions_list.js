const db = require('../db');

const questionsList = (type, tag, searchWord, page, userID, answerUserID, callback) => {
  const numOfQuestionPerPage = 20;
  let tagFilter = '';
  let numOfQuestions = '';
  let str = '';
  let pageString = '';
  let joinStr = '';
  if (searchWord !== null) {
    const tmpArr = searchWord.split(' ');
    for (let i = 0; i < tmpArr.length; i++) {
      str += `AND questions.title LIKE '%${tmpArr[i]}%'`;
    }
  }
  if (userID !== null) {
    str += `AND questions.userID=${userID}`;
  }
  if (answerUserID !== null) {
    str += `AND answers.userID=${answerUserID}`;
    joinStr += 'INNER JOIN answers ON answers.questionID=questions.id';
  }
  if (page !== null) {
    pageString = `LIMIT ${0 + (page - 1) * numOfQuestionPerPage}, ${numOfQuestionPerPage}`;
  }

  if (tag !== null) {
    tagFilter += `HAVING tags LIKE '%${tag}%'`;
    numOfQuestions += `(SELECT COUNT(*) FROM 
                          (SELECT questions.*, 
                            GROUP_CONCAT(tags.tag) AS tags
                          FROM questions 
                        LEFT JOIN q_tag 
                          ON questions.id = q_tag.questionID 
                        LEFT JOIN tags 
                          ON q_tag.tagID = tags.id 
                        INNER JOIN users 
                          ON userID = users.id
                        WHERE questions.deleted=0 
                        GROUP BY questions.id HAVING tags LIKE '%${tag}%') AS tmp) AS countQuestions,`;
  } else {
    numOfQuestions += `(SELECT COUNT(*) FROM questions WHERE questions.deleted = 0 ${str}) AS countQuestions,`;
  }
  let orderBy = '';
  if (type === 'normal') {
    orderBy = 'id';
  } else if (type === 'view') {
    orderBy = 'view';
  } else if (type === 'good') {
    orderBy = 'good';
  } else if (type === 'reward') {
    orderBy = 'reward';
  } else {
    orderBy = 'id';
  }

  const sql = `SELECT questions.*, 
                      users.username, 
                      GROUP_CONCAT(tags.tag) AS tags,
                      ${numOfQuestions}
                      (SELECT COUNT(*) FROM answers WHERE answers.questionID=questions.id) AS countAnswers 
                  FROM questions 
                LEFT JOIN q_tag 
                ON questions.id = q_tag.questionID 
                LEFT JOIN tags 
                ON q_tag.tagID = tags.id 
                INNER JOIN users 
                ON userID = users.id
                ${joinStr}
                WHERE questions.deleted=0 
                ${str}
                GROUP BY questions.id ${tagFilter}                
                ORDER BY ${orderBy} DESC ${pageString}`;
  db.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      // console.log(result);
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports = questionsList;
