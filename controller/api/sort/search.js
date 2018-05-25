/*
    POST /api/sort/search

    {
      data
    }
*/
const Promise = require("bluebird");

const questionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const search = (req, res) => {
  const searchWords = req.body.data;
  const page = req.url.split('/')[2];
  questionsList('normal', null, searchWords, page, null, null).then((questions) => {
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

module.exports = search;