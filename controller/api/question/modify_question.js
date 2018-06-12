/*
POST /api/question/modifyquestion/{questionID}
{
  body,
  title,
  reward,
  questionID
}
*/

const Promise = require("bluebird");

const updateQuestion = Promise.promisify(require("../../../model/update_question"));

const modifyQuestion = (req, res) => {
  let target = {};
  target.questionID = req.body.questionID;
  target.title = JSON.stringify(req.body.title);
  target.body = JSON.stringify(req.body.body);
  target.reward = req.body.reward;


  updateQuestion(target).then(() => {
    res.send({
      message: 'modify complete!'
    });
  })
}

module.exports = modifyQuestion;