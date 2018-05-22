/*
POST /api/question/modifyquestion
{
  body,
  questionID
}
*/

const Promise = require("bluebird");

const updateAnswer = Promise.promisify(require("../../../model/updateAnswer"));

const modifyAnswer = (req, res) => {
  let target = {};
  target.answerID = req.url.split('/')[2];
  target.body = req.body.body;


  updateAnswer(target).then(() => {
    res.send({
      message: 'modify Answer complete!'
    });
  })
}

module.exports = modifyAnswer;