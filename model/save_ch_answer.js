const db = require('../db');

const saveChAnswer = (target, userID, callback) => {
  const { answerID } = target;
  const body = JSON.stringify(target.body);
  const sql = `INSERT INTO childanswers(body, answerID, userID) 
              VALUES(${body}, ${answerID}, ${userID})`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('child answer is saved');
      console.log(result);
      callback(null, 'save child answer complete!');
    }
  });
};

module.exports = saveChAnswer;
