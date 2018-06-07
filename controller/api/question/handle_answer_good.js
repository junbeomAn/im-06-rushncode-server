/*
    POST /api/question/goodanswer/{answerID}
*/
const Promise = require("bluebird");
const db = require('../../../db/index');
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));
const updateAnswerGood = Promise.promisify(require("../../../model/update_answer_good"));
const updateAnswerGoodUser = Promise.promisify(require("../../../model/update_answer_good_user"));

const handleAnswerGood = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const answerID = req.url.split('/')[2];
  verifyToken(token).then((email) => {
    updateAnswerGood(answerID, email).then(() => {
      updateAnswerGoodUser(answerID, email).then((result) => {
        res.send({
          message: result
        })
      })
    })
  })
}

module.exports = handleAnswerGood;