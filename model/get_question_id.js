const db = require('../db');



const getQuestionID = (answerID, callback) => {
  const sql = `SELECT * FROM answers 
    WHERE answers.id=${answerID}`;

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

module.exports = getQuestionID;