/*
    POST /api/auth/signin
    {
        email,
        password
    }
*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const model = require("../../../model/signInSignUp");

const signin = (req, res) => {
  const { email, password } = req.body;

  const cryptPassword = (target, callback) => {
    bcrypt.compare(password, target, function(err, truth) {
      if (err) {
        console.log(err);
        callback({
          message: err
        });
      } else {
        if (truth) {
          // console.log('login success');
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
              } else {
                callback({
                  message: "login success",
                  token
                });
              }
            }
          );
        } else {
          console.log("login fail");
          callback({
            message: "password is not corret"
          });
        }
      }
    });
  };

  model.checkEmail(email, (err, result) => {
    if (err) {
      res.send({
        message: err
      });
    } else {
      if (result.length !== 0) {
        cryptPassword(result[0].password, resultVerify => {
          res.send(resultVerify);
        });
      } else {
        console.log("not exist");
        res.send(resultVerify);
      }
    }
  });
};

module.exports = signin;
