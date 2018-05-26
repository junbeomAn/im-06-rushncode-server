/*
    POST /api/auth/github
*/
const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const querystring = require("querystring");
const googleAuth = require("./client_secret_1057319403388-ng0dluqb41b5kk4gt37bot92piirjiu6.apps.googleusercontent.com");
const saveUser = Promise.promisify(require("../../../model/saveUser"));
const checkUser = Promise.promisify(require("../../../model/checkUser"));

var makeToken = (email, callback) => {
  jwt.sign(
    {
      email: email
    },
    "rushncode",
    {
      expiresIn: "7d",
      issuer: "rushncode",
      subject: "userInfo"
    },
    (err, token) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, {
          message: "login success",
          token
        });
      }
    }
  );
};

makeToken = Promise.promisify(makeToken);

const github = (req, res) => {
  const code = req.body.code;

  console.log(googleAuth.web.client_id);
  const { client_id, client_secret } = googleAuth.web;

  axios
    .get(
      `https://graph.facebook.com/v3.0/oauth/access_token?client_id=235916540497077&redirect_uri=https://www.facebook.com/v3.0/dialog/oauth?client_id=235916540497077&redirect_uri=http://localhost:3000/auth/facebook&state=st=state123abc,ds=123456789&response_type=code&client_secret=9d32080a7858a054d18cf86dacb06957&code=${code}`
    )
    .then(result => {
      const facebookToken = result.data.access_token;
      console.log(facebookToken);
      axios
        .get(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${facebookToken}`
        )
        .then(userInfo => {
          console.log(userInfo.data);
          const user = {
            email: userInfo.data.email || userInfo.data.id + "@facebook",
            username: userInfo.data.name,
            password: null
          };
          checkUser(user.email).then(result => {
            if (result) {
              makeToken(user.email).then(resultToken => {
                res.send(resultToken);
              });
            } else {
              saveUser(user, () => {
                makeToken(user.email).then(resultToken => {
                  res.send(resultToken);
                });
              });
            }
          });
        });
    });
};

module.exports = github;
// https://www.facebook.com/v3.0/dialog/oauth?client_id=235916540497077&redirect_uri=https://localhost:3000/auth/facebook&state=st=state123abc,ds=123456789&response_type=code&scope=email,public_profile
