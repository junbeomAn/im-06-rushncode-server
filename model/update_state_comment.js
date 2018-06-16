const db = require('../db');


const updateStateComment = (userID, comment, callback) => {
  comment = JSON.stringify(comment);
  const sql = `UPDATE users
                SET state_comment = ${comment}
                WHERE id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = updateStateComment;