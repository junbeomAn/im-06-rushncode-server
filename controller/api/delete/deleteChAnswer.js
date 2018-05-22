/*
    POST /api/delete/chanswer/{chAnswerID}
    
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const delChAnswer = Promise.promisify(require("../../../model/delChAnswer"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const deleteChAnswer = (req, res) => {
  const chAnswerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      delChAnswer(chAnswerID).then(() => {
        res.send();
      });
    });
  });
  
}

module.exports = deleteChAnswer;