var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asdqwe123",
  database: "rushNcode"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// connection.query("DROP TABLE IF EXISTS `childAnswers`");
// connection.query("DROP TABLE IF EXISTS `answers`");
// connection.query("DROP TABLE IF EXISTS `q_user`");
// connection.query("DROP TABLE IF EXISTS `questions`");
// connection.query("DROP TABLE IF EXISTS `childReplies`");
// connection.query("DROP TABLE IF EXISTS `replies`");
// connection.query("DROP TABLE IF EXISTS `posts`");
// connection.query("DROP TABLE IF EXISTS `users`");


var sql = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT,
    email VARCHAR(255), 
    username VARCHAR(255), 
    password VARCHAR(255),     
    total_reward INTEGER DEFAULT 0, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add users table");
});

sql = `CREATE TABLE IF NOT EXISTS questions (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(255), 
  body VARCHAR(255), 
  good INTEGER,    
  reward INTEGER, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add questions table");
});

sql = `CREATE TABLE IF NOT EXISTS q_user (
  good BOOLEAN DEFAULT FALSE,    
  userID INTEGER,
  questionID INTEGER,
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (questionID) REFERENCES questions(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add q_user table");
});

sql = `CREATE TABLE IF NOT EXISTS answers (
  id INTEGER AUTO_INCREMENT,
  body VARCHAR(255), 
  good INTEGER,    
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  questionID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (questionID) REFERENCES questions(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add answers table");
});

sql = `CREATE TABLE IF NOT EXISTS childAnswers (
  id INTEGER AUTO_INCREMENT,
  body VARCHAR(255), 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  answerID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (answerID) REFERENCES answers(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add childAnswers table");
});

sql = `CREATE TABLE IF NOT EXISTS tags (
  id INTEGER AUTO_INCREMENT,
  tag VARCHAR(255), 
  PRIMARY KEY(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add tags table");
});

sql = `CREATE TABLE IF NOT EXISTS q_tag (
  tagID INTEGER,
  questionID INTEGER,
  FOREIGN KEY (tagID) REFERENCES tags(id),
  FOREIGN KEY (questionID) REFERENCES questions(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add q_tag table");
});


sql = `CREATE TABLE IF NOT EXISTS posts (
  id INTEGER AUTO_INCREMENT,
  title VARCHAR(255), 
  body VARCHAR(255), 
  good INTEGER,    
  reward INTEGER, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add posts table");
});

sql = `CREATE TABLE IF NOT EXISTS replies (
  id INTEGER AUTO_INCREMENT,
  body VARCHAR(255), 
  good INTEGER,    
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  questionID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (questionID) REFERENCES posts(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add replies table");
});

sql = `CREATE TABLE IF NOT EXISTS childReplies (
  id INTEGER AUTO_INCREMENT,
  body VARCHAR(255), 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  userID INTEGER,
  answerID INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (answerID) REFERENCES replies(id)
)`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add childReplies table");
});

module.exports = connection;