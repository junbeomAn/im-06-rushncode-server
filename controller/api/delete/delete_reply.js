/*
    POST /api/delete/chanswer/{chAnswerID}

*/

const Promise = require('bluebird');

const checkUser = Promise.promisify(require('../../../model/check_user'));
const delReply = Promise.promisify(require('../../../model/del_reply'));
const verifyToken = Promise.promisify(require('../../utillity/verify_token'));

const deleteReply = (req, res) => {
  const replyID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email, null).then((user) => {
      delReply(replyID).then(() => {
        res.send();
      });
    });
  });
};

module.exports = deleteReply;
