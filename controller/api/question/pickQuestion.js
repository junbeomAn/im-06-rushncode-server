/*
    POST /api/question/pick
    {
        body,
        questionID
    }
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const updateNumOfQuestions = Promise.promisify(require("../../../model/updateNumOfQuestions"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));

const leaveReply = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const data = req.body;
  verifyToken(token).then((email) => {
    checkUser(email).then((result) => {
      if(result) {
        const userID = result.id;
        updateNumOfQuestions(userID).then(() => {
          res.send('seccess');
        })
      } else {
        res.send('invalid token');
      }
    });
  });
}

module.exports = leaveReply;