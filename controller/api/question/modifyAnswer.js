/*
POST /api/question/modifyanswer
{
  body,
  answerID
}
*/

const Promise = require("bluebird");

const updateAnswer = Promise.promisify(require("../../../model/updateAnswer"));

const modifyAnswer = (req, res) => {
  let target = {};
  target.answerID = req.body.answerID;
  target.body = req.body.body;


  updateAnswer(target).then(() => {
    res.send({
      message: 'modify Answer complete!'
    });
  })
}

module.exports = modifyAnswer;