/*
    POST /api/sort/search

    {
      data
    }
*/
const Promise = require("bluebird");

const searchQuestions = Promise.promisify(require("../../../model/searchQuestions"));


const search = (req, res) => {
  const searchWords = req.body.data;
  const page = req.url.split('/')[2];
  searchQuestions(searchWords, page).then((questions) => {
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

module.exports = search;