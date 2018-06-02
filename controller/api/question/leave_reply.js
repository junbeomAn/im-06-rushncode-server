/*
    POST /api/question/reply
    {
        body,
        questionID
    }
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/check_user"));
const saveReply = Promise.promisify(require("../../../model/save_reply"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));

const leaveReply = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const data = req.body;
  verifyToken(token).then((email) => {
    checkUser(email, null).then(result => {
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