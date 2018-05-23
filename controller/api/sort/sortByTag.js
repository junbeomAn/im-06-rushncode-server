/*
    POST /api/sort/tag
*/
const Promise = require("bluebird");

const getQuestionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const sortByTag = (req, res) => {
  const page = req.url.split('/')[2];
  const tag = req.body.tag;
  getQuestionsList('normal', tag, page).then((questions) => {
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

module.exports = sortByTag;