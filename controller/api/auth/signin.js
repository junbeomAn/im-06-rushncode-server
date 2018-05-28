/*
POST /api/auth/signin
{
  email,
  password
}
*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const checkUser = require('../../../model/check_user');

const signin = (req, res) => {
  const { email, password } = req.body;

  const cryptPassword = (target, callback) => {
    bcrypt.compare(password, target, (err, truth) => {
      if (err) {
        console.log(err);
        callback({
          message: err,
        });
      } else if (truth) {
        // console.log('login success');
        jwt.sign(
          {
            email,
          },
          'rushncode',
          {
            expiresIn: '7d',
            issuer: 'rushncode',
            subject: 'userInfo'
          }, (error, token) => {
            if (error) {
              console.log(error);
              callback(error, null);
            } else {
              callback(null, {
                message: 'login success',
                token,
              });
            }
          },
        );
      } else {
        callback({
          message: 'password is not corret',
        });
      }
    });
  };

  checkUser(email, (err, result) => {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      console.log('######', result.verified === 1);
      if (result) {
        if (result.verified === 1) {
          cryptPassword(result.password, (error, resultVerify) => {
            res.send(resultVerify);
          });
        } else {
          res.send({
            message: 'check your email & verify',
          });
        }
      } else {
        console.log("not exist");
        res.send({
          message: 'email is not exist',
        });
      }
    }
  });
};

module.exports = signin;
