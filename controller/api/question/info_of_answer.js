/*
POST /api/question/modifyquestion
{
  body,
  questionID
}
*/

const Promise = require("bluebird");

const checkAnswer = Promise.promisify(require("../../../model/check_answer"));

const infoOfAnswer = (req, res) => {
  const answerID = req.url.split('/')[2];

  checkAnswer(answerID).then((answer) => {
    res.send({
      message: 'seccess',
      data: answer
    });
  })
}

module.exports = infoOfAnswer;