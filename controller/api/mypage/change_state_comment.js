/*
    POST /api/profile/updatestatus/{userID}
*/
const Promise = require('bluebird');

const checkUser = Promise.promisify(require('../../../model/check_user'));
const updateStateComment = Promise.promisify(require('../../../model/update_state_comment'));

const verifyToken = Promise.promisify(require('../../utillity/verify_token'));

const changeComment = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const userID = Number(req.url.split('/')[2]);
  const { status } = req.body;
  verifyToken(token).then((email) => {
    checkUser(email, null).then((user) => {
      updateStateComment(userID, status).then((result) => {
        res.send({
          message: result
        })
      })
    });
  });
};

module.exports = changeComment;
