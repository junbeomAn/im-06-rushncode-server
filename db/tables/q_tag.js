const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS q_tag (
  tagID INTEGER,
  questionID INTEGER,
  FOREIGN KEY (tagID) REFERENCES tags(id),
  FOREIGN KEY (questionID) REFERENCES questions(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add q_tag table");
});