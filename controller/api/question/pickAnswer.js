/*
    POST /api/question/pickanswer/{answerID}
    
*/

const Promise = require("bluebird");

const updatePickStateAnswer = Promise.promisify(require("../../../model/updatePickStateAnswer"));
const updateNumOfChooseAnswers = Promise.promisify(require("../../../model/updateNumOfChooseAnswers"));
const checkUser = Promise.promisify(require("../../../model/checkUser"));
const getQuestionID = Promise.promisify(require("../../../model/getQuestionID"));
const updatePickedOfQuestion = Promise.promisify(require("../../../model/updatePickedOfQuestion"));
const checkQuestion = Promise.promisify(require("../../../model/checkQuestion"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const pickAnswer = (req, res) => {
  const answerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      getQuestionID(answerID).then((questionID) => {
        checkQuestion(null, null, questionID).then((question) => {
          console.log(question);
          if(question.exist_picked_ans === 1) {
            res.send({
              message: 'already picked answer of this question'
            })
          } else {
            updateNumOfChooseAnswers(user.id).then(() => {
              updatePickStateAnswer(answerID).then(() => {
                updatePickedOfQuestion(questionID).then(() => {
                  res.send({
                    message: 'good'
                  });
                });
              });
            });
          }
        });
      });
    });
  });
}

module.exports = pickAnswer;