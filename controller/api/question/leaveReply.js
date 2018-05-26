/*
    POST /api/question/reply
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
      if(result) {
        const userID = result.id;
        saveReply(data, userID).then(() => {
          res.send('seccess');
        })
      } else {
        res.send('로그인 해라');
      }
      
    });
  });
}

module.exports = leaveReply;