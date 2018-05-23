const db = require('../db');



const checkQuestion = (target, userID, questionID, callback) => {
  let str = '';
  if(target !== null && userID !== null) {
    str += `WHERE (title='${target.title}' AND body='${target.body}' AND userID=${userID})`;
  } else if(questionID !== null) {
    str += `WHERE id=${questionID}`
  }
  const sql = `SELECT * FROM questions 
                ${str}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      //console.log(result);
      if (result.length !== 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = checkQuestion;