const db = require('../db');



const getQuestion = (target, callback) => {
  const sql = `SELECT 
                users.username,
                users.image,
                users.id AS userID,
                questions.id AS qID, 
                questions.title, 
                questions.body AS qBody, 
                questions.updated_at AS qTime, 
                questions.good AS qGood, 
                questions.reward AS qReward,
                questions.view AS qView, 
                questions.exist_picked_ans 
              FROM questions 
              INNER JOIN users 
              ON questions.userID = users.id
              WHERE questions.id=${target}`;

  db.query(sql, function (err, result) {
    if (err) {
      callback(err, null, null);
    } else {
      //console.log(result);
      if (result.length !== 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
}

module.exports = getQuestion;