/*
    POST /api/auth/github
*/
const Promise = require("bluebird");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');
const googleAuth = require('./client_secret_1057319403388-ng0dluqb41b5kk4gt37bot92piirjiu6.apps.googleusercontent.com');
const saveUser = Promise.promisify(require("../../../model/saveUser"));
const checkUser = Promise.promisify(require("../../../model/checkUser"));

var makeToken = (email, callback) => {
  jwt.sign({
    email: email
  }, 'rushncode', {
    expiresIn: '7d',
    issuer: 'rushncode',
    subject: 'userInfo'
  }, (err, token) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, {
        message: 'login success',
        token
      });
    }
  })
}

makeToken = Promise.promisify(makeToken);

const github = (req, res) => {
  const code = req.body.code;

  console.log(googleAuth.web.client_id);
  const {
    client_id,
    client_secret
  } = googleAuth.web;

  const data = {
    code,
    client_id,
    client_secret,
    redirect_uri: 'http://localhost:3000/auth/google',
    grant_type: 'authorization_code'
  }
  axios.post(`https://www.googleapis.com/oauth2/v4/token`, querystring.stringify(data)).then((result) => {
    const googleToken = result.data.access_token;
    console.log(googleToken);
    axios.get(`https://www.googleapis.com/plus/v1/people/me?access_token=${googleToken}`).then(userInfo => {
      console.log(userInfo.data);
      const user = {
        email: userInfo.data.emails[0].value,
        username: userInfo.data.displayName,
        password: null
      }
      checkUser(user.email).then((result) => {
        if (result) {
          makeToken(user.email).then((resultToken) => {
            res.send(resultToken);
          })
        } else {
          saveUser(user, () => {
            makeToken(user.email).then((resultToken) => {
              res.send(resultToken);
            })
          });
        }
      })
    })
  })
}

module.exports = github;
// https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=https://localhost:3000/auth/google&response_type=code&client_id=1057319403388-ng0dluqb41b5kk4gt37bot92piirjiu6.apps.googleusercontent.com