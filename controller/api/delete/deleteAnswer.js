/*
    POST /api/delete/answer/{answerID}
    
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const delAnswer = Promise.promisify(require("../../../model/delAnswer"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const deleteAnswer = (req, res) => {
  const answerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      delAnswer(answerID).then(() => {
        res.send();
      })
    })
  });
  
}

module.exports = deleteAnswer;