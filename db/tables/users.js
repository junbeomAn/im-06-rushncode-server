const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL, 
  username VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL,    
  total_reward FLOAT DEFAULT 0, 
  num_of_questions INTEGER DEFAULT 0, 
  choose_answers INTEGER DEFAULT 0, 
  num_of_answers INTEGER DEFAULT 0,
  picked_answers INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE, 
  meta_address VARCHAR(100),
  image VARCHAR(255) DEFAULT 'default/default',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add users table");
});