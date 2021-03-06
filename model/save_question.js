const db = require('../db');

const saveQuestion = (target, userID, callback) => {
  const { title, body, reward } = target;
  console.log(body);
  const sql = `INSERT INTO questions(title, body, reward, userID) 
              VALUES(${title}, ${body}, ${reward}, ${userID})`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('question is saved in DB');
      callback(null, 'save question complete!');
    }
  });
};

module.exports = saveQuestion;
