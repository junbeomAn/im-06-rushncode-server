/*
    POST /api/delete/question/{questionID}
    
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const delQuestion = Promise.promisify(require("../../../model/delQuestion"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const deleteQuestion = (req, res) => {
  const questionID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      delQuestion(questionID).then(() => {
        res.send();
      });
    });
  });
  
}

module.exports = deleteQuestion;