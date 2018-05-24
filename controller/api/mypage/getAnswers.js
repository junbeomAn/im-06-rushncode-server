/*
    GET /api/profile/getanswers/{userID}
*/
const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const getAnswers = Promise.promisify(require("../../../model/getAnswers"));

const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));

const profile = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const userID = req.url.split('/')[2];
  verifyToken(token).then((email) => {
    checkUser(email).then((result) => {
      getAnswers(null, userID).then((answers) => {
        res.send({
          message: 'good',
          answers
        })
      })
    })
  })
}

module.exports = profile;