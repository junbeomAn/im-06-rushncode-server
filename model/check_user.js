const db = require('../db');



const checkUser = (email, userID, callback) => {
  if(email !== null) {
    const str = `email='${email}'`;
  } else {
    const str = `id='${userID}'`;
  }
  const sql = `SELECT * FROM users WHERE ${str}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null, null);
    } else {
      if (result.length !== 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = checkUser;