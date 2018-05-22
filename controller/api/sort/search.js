/*
    GET /api/question/getlist
*/
const Promise = require("bluebird");

const searchQuestions = Promise.promisify(require("../../../model/searchQuestions"));


const search = (req, res) => {
  const searchWords = req.body.data;
  searchQuestions(searchWords).then((result) => {
    res.send(result);
  })
}

module.exports = search;