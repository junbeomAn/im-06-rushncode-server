/*
    POST /api/delete/question/{questionID}
    
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/check_user"));
const delQuestion = Promise.promisify(require("../../../model/del_question"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));


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