/*
    GET /api/question/getlist
*/

const db = require('../../../db/index');

const getList = (req, res) => {
  const sql = `SELECT * FROM questions`
  db.query(sql, function (err, result) {
    if (err) {
      res.send({
        message: err
      })
    } else {
      res.send({
        message: 'good',
        data: result
      })
    }
  });

}

module.exports = getList;