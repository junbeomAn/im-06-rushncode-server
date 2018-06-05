/*
    POST /api/auth/github
*/
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const githubAuth = require('./github_auth');
const saveUser = Promise.promisify(require("../../../model/save_user"));
const checkUser = Promise.promisify(require("../../../model/check_user"));

let makeToken = (email, callback) => {
  jwt.sign(
    { email },
    'rushncode',
    { expiresIn: '7d', issuer: 'rushncode', subject: 'userInfo' },
    (err, token) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, {
          message: 'login success',
          token,
        });
      }
    },
  );
};

makeToken = Promise.promisify(makeToken);

const github = (req, res) => {
  const { code, metaAddress } = req.body;
  const { clientId, clientSecret } = githubAuth;

  axios
    .post(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`)
    .then((result) => {
      const githubToken = result.data.split('&')[0].slice(13);
      axios.get(`https://api.github.com/user?access_token=${githubToken}`).then((userInfo) => {
        console.log(userInfo.data);
        const user = {
          email: `${userInfo.data.login}@github`,
          username: userInfo.data.login,
          password: null,
          metaAddress
        };

        checkUser(user.email, null)
          .then((result) => {
            if (result) {
              makeToken(user.email)
                .then(resultToken => res.send(resultToken))
            } else {
              saveUser(user, () => {
                makeToken(user.email)
                  .then((resultToken) => res.send(resultToken))
              });
            }
          })
      })
  })
}

module.exports = github;
// https://github.com/login/oauth/authorize?client_id=9eccd23df65b6d3581f9
