const db = require("../db");

const saveQnTag = (target, questionID, callback) => {
  console.log(target);
  const sql = `INSERT INTO q_tag(tagID, questionID) 
      VALUES(${target[0].id}, ${questionID}), 
      (${target[1].id}, ${questionID}), 
      (${target[2].id}, ${questionID})`;
  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
};

module.exports = saveQnTag;