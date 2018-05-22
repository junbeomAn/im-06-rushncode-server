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
  searchQuestions(searchWords, 1).then((result) => {
    res.send({
      message: good,
      data: result
    });
  })
}

module.exports = search;