const db = require('../db');


const saveUser = (target, callback) => {
  const sql = `INSERT INTO users(email, username, password, metaAddress) 
                VALUES('${target.email}', '${target.username}', '${target.password}', '${target.metaAddress}')`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, false);
    } else {
      console.log(result);
      callback(null, true);
    }
  });
}

module.exports = saveUser;