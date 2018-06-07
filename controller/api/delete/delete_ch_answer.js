/*
    POST /api/delete/chanswer/{chAnswerID}
    
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/check_user"));
const delChAnswer = Promise.promisify(require("../../../model/del_ch_answer"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));


const deleteChAnswer = (req, res) => {
  const chAnswerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email, null).then((user) => {
      delChAnswer(chAnswerID).then(() => {
        res.send();
      });
    });
  });
  
}

module.exports = deleteChAnswer;