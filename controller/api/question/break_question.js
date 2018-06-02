/*
POST /api/question/breakquestion
{
  questionID
}
*/

const Promise = require('bluebird');

const updateStateOfQuestion = Promise.promisify(require("../../../model/update_state_of_question"));

const breakQuestion = (req, res) => {
  const { questionID } = req.body;
  updateStateOfQuestion(questionID, 'break').then(() => {
    res.send({
      message: 'good',
    })
  })
};

module.exports = breakQuestion;
