const db = require('../db');



const saveImagePath = (userID, path, callback) => {
  const sql = `INSERT INTO users(image) 
                VALUES('${path}')
                WHERE users.id=${userID}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log("path is saved");
      console.log(result);
      callback(null, 'save image path complete!');
    }
  });
}

module.exports = saveImagePath;