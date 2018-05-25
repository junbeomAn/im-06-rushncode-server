/*
    POST /api/sort/tag
*/
const Promise = require("bluebird");

const questionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const sortByTag = (req, res) => {
  const page = req.url.split('/')[3];
  const tag = req.url.split('/')[2];
  questionsList('normal', tag, null, page, null, null).then((questions) => {
    if(questions) {
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].tags === null) {
          questions[i].tags = [];
        } else {
          questions[i].tags = questions[i].tags.split(',');
        }
      }
      res.send({
        message: 'good',
        data: questions
      });
    } else {
      res.send({
        message: 'no result'
      });
    }
  })
}

module.exports = sortByTag;