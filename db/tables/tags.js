const db = require('../index');

const sql = `CREATE TABLE IF NOT EXISTS tags (
  id INTEGER AUTO_INCREMENT,
  tag VARCHAR(255), 
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`;

const tags = [ 'Ajax', 'Android', 'Angular', 'apache', 'AWS', 'bash', 'C', 'C#', 'C++', 'CSS',
              'database', 'dJango', 'eclipse', 'Editor', 'express', 'Flask', 'github', 'go',
              'GraphQL', 'iOS', 'javascript', 'JSON', 'Kotlin', 'linux', 'MariaDB', 'Markdown',
              'MongoDB', 'MySQL', 'Next', 'node.js', 'objective-c', 'oracle', 'postgreSQL',
              'python', 'React', 'ReactNative', 'Redux', 'Ruby', 'ruby-on-rails', 'socket',
              'Solidity', 'spring', 'SQL', 'swift', 'type script', 'visual studio', 'vue',
              'windows', 'xcode', '기타' ]
db.query(sql, (err, result) => {
  if (err) throw err;
  console.log('add tags table');
});

for(let i = 0;i < tags.length;i++) {
  var query = `INSERT INTO tags(tag) SELECT *
  FROM (SELECT ('${tags[i]}')) AS tmp
  WHERE NOT EXISTS 
  (SELECT * FROM tags WHERE tags.tag = '${tags[i]}')`;

  db.query(query, (err, result) => {
  if (err) throw err;
  });
}


