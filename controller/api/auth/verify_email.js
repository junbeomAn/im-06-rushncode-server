/*
POST /api/auth/verifyemail
{
  email,
  password
}
*/

const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const getNotVerifiedEmails = Promise.promisify(require('../../../model/get_not_verified_emails'));
const updateUserVerified = Promise.promisify(require('../../../model/update_user_verified'));

const verifyEmail = (req, res) => {
  const index = req.url.slice(13).indexOf('/');
  const hash = req.url.slice(13).slice(index + 1);
  const id = req.url.split('/')[2];
  getNotVerifiedEmails(id).then((emails) => {
    console.log(emails);
    bcrypt.compare(emails[0].email, hash, (err, result) => {
      if (result === true) {
        updateUserVerified(emails[0].email).then(() => {
          res.redirect(process.env.URL_PROD + '/auth/signin');
        });
      } else {
        res.send('melong');
      }
    });
  });
};

module.exports = verifyEmail;
