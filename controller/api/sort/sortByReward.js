/*
    GET /api/sort/reward
*/
const Promise = require("bluebird");

const getQuestionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const sortByView = (req, res) => {
  const page = req.url.split('/')[2];
  getQuestionsList('reward', null, page).then((questions) => {
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

module.exports = sortByView;