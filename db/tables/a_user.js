const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS a_user (
  userID INTEGER,
  answerID INTEGER,
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (answerID) REFERENCES answers(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add a_user table");
});