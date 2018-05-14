const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS q_user (
  userID INTEGER,
  questionID INTEGER,
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (questionID) REFERENCES questions(id)
)`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add q_user table");
});