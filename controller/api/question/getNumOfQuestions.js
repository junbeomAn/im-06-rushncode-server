/*
    GET /api/question/gettag
*/

const Promise = require("bluebird");

const updateNumOfQuestions = Promise.promisify(require("../../../model/updateNumOfQuestions"));

const getNumOfQuestions = (req, res) => {
  // getTagList().then((result) => {
  //   res.send({
  //     data: result
  //   });
  // });
}

module.exports = getNumOfQuestions;