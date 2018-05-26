/*
POST /api/question/modifyanswer
{
  body,
  answerID
}
*/

const Promise = require("bluebird");

const updateAnswer = Promise.promisify(require("../../../model/updateAnswer"));
const checkAnswer = Promise.promisify(require("../../../model/checkAnswer"));

const modifyAnswer = (req, res) => {
  let target = {};
  target.answerID = req.body.answerID;
  target.body = req.body.body;


  updateAnswer(target).then(() => {
    checkAnswer(target.answerID).then((answer) => {
      res.send({
        message: 'modify Answer complete!',
        questionID: answer.questionID
      });
    })
  })
}

module.exports = modifyAnswer;