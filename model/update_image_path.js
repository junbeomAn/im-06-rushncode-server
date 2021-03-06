const db = require('../db');

const updateImagePath = (userID, path, callback) => {
  const sql = `UPDATE users SET users.image='${path}'
                WHERE users.id=${userID}`;

  db.query(sql, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('path is saved');
      console.log(result);
      callback(null, 'save image path complete!');
    }
  });
};

module.exports = updateImagePath;
