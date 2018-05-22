/*
    POST /api/delete/chanswer/{chAnswerID}

*/

const Promise = require('bluebird');

const checkUser = Promise.promisify(require('../../../model/checkUser'));
const delReply = Promise.promisify(require('../../../model/delReply'));
const verifyToken = Promise.promisify(require('../../utillity/verifyToken'));

const deleteReply = (req, res) => {
  const replyID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      delReply(replyID).then(() => {
        res.send();
      });
    });
  });
};

module.exports = deleteReply;
