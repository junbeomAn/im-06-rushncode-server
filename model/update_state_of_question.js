const db = require('../db');

const updateStateOfQuestion = (questionID, type, callback) => {
  let str = '';
  if(type === 'pick') {
    str = 'exist_picked_ans = 1';
  } else if(type === 'break') {
    str = 'breaked = 1';
  }
  const sql = `UPDATE questions 
                SET ${str}
                WHERE questions.id=${questionID}`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
};

module.exports = updateStateOfQuestion;
