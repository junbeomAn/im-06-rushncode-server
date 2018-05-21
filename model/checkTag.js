const db = require('../db');

const updateView = (target, callback) => {
  const sql = `SELECT * FROM tags 
                WHERE tag IN('${target[0]}', '${target[1]}', '${target[2]}')`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, false);
    } else if (result.length !== 0) {
      callback(null, result);
    } else {
      callback(null, null);
    }
  });
};

module.exports = updateView;
