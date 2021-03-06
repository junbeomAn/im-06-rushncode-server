/*
    POST /api/question/chanswer
    {
        body,
        questionID
    }
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/check_user"));
const saveChAnswer = Promise.promisify(require("../../../model/save_ch_answer"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));

const leaveChAnswer = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const data = req.body;
  verifyToken(token).then((email) => {
    checkUser(email, null).then(result => {
      const userID = result.id;
      saveChAnswer(data, userID).then(() => {
        res.send('success');
      })
    });
  });
}

module.exports = leaveChAnswer;