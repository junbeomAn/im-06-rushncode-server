/*
    POST /api/question/pickanswer
*/

const Promise = require("bluebird");

const updatePickStateAnswer = Promise.promisify(require("../../../model/updatePickStateAnswer"));
const updateNumOfChooseAnswers = Promise.promisify(require("../../../model/updateNumOfChooseAnswers"));
const checkUser = Promise.promisify(require("../../../model/checkUser"));

const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const pickAnswer = (req, res) => {
  const answerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      updateNumOfChooseAnswers(user.id).then(() => {
        updatePickStateAnswer(answerID).then(() => {
          res.send();
        })
      })
    })
  });
  
}

module.exports = pickAnswer;