const db = require('../db');


const updateStateOfQuestion = (questionID, type, callback) => {
  if(type === 'pick') {
    const str = `exist_picked_ans = 1`;
  } else if(type === 'break') {
    const str = `breaked = 1`;
  }
  const sql = `UPDATE questions 
                SET ${str}
                WHERE questions.id=${questionID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = updateStateOfQuestion;

