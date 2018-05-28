const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS childanswers (
  id INTEGER AUTO_INCREMENT,
  body VARCHAR(255), 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  answerID INTEGER,
  deleted BOOLEAN DEFAULT FALSE, 
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (answerID) REFERENCES answers(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add childAnswers table");
});