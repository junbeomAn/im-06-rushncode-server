/*
    POST /api/question/chanswer
    {
        body,
        questionID
    }
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const saveReply = Promise.promisify(require("../../../model/saveReply"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));

const leaveReply = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const data = req.body;
  verifyToken(token).then((email) => {
    checkUser(email).then(result => {
      const userID = result.id;
      saveReply(data, userID).then(() => {
        res.send('seccess');
      })
    });
  });
}

module.exports = leaveReply;