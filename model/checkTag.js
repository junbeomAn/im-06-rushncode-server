const db = require("../db");

const checkTag = (target, callback) => {
  const sql = `SELECT * FROM tags 
    WHERE tag IN('${target[0]}', '${target[1]}', '${target[2]}')`;
  db.query(sql, function (err, result) {
    if (err) {
      conosle.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      callback(err, null);
    } else {
      console.log('@#@#!!!!!!!!!!!!!!', result);
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports = checkTag;