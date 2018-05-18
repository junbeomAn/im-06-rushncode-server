/*
    GET /api/question/gettag
*/

const Promise = require("bluebird");

const getTagList = Promise.promisify(require("../../../model/getTagList"));

const getNumOfQuestions = (req, res) => {
  // getTagList().then((result) => {
  //   res.send({
  //     data: result
  //   });
  // });
}

module.exports = getNumOfQuestions;