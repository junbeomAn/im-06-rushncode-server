const db = require('../db');


const delReply = (replyID, callback) => {
  const sql = `UPDATE replies 
                SET deleted=1 
                WHERE replies.id=${replyID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

module.exports = delReply;