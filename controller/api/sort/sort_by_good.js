/*
    GET /api/sort/good
*/
const Promise = require("bluebird");

const questionsList = Promise.promisify(require("../../../model/get_questions_list"));


const sortByGood = (req, res) => {
  const page = req.url.split('/')[2];
  questionsList('good', null, null, page, null, null).then((questions) => {
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
  })
}

module.exports = sortByGood;