const db = require('../db');



const saveReply = (target, userID, callback) => {
  const { body, questionID } = target;
  const sql = `INSERT INTO replies(body, questionID, userID) 
              VALUES('${body}', ${questionID}, ${userID})`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log("reply is saved");
      console.log(result);
      callback(null, 'save reply complete!')
    }
  });
}

module.exports = saveReply;