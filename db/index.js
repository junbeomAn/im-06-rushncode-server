const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5dnjfdlek!',
  database: 'rushNcode',
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

// connection.query('DROP TABLE IF EXISTS `childAnswers`');
// connection.query('DROP TABLE IF EXISTS `answers`');
// connection.query('DROP TABLE IF EXISTS `q_user`');
// connection.query('DROP TABLE IF EXISTS `questions`');
// connection.query('DROP TABLE IF EXISTS `childReplies`');
// connection.query('DROP TABLE IF EXISTS `replies`');
// connection.query('DROP TABLE IF EXISTS `posts`');
// connection.query('DROP TABLE IF EXISTS `users`');

module.exports = connection;
