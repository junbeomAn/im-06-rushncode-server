/*
    POST /api/auth/signup
    {
        email,
        username,
        password
    }
*/
const bcrypt = require('bcrypt-nodejs');
const saveUser = require('../../../model/save_user');
const checkUser = require('../../../model/check_user');
const sendMail = require('./send_mail');

const signup = (req, res) => {
  const {
    email,
    username,
    password,
    metaAddress
  } = req.body;
  console.log('@@@@@@@', req.body);

  checkUser(email, null, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        message: err
      })
    } else {
      if (result) {
        console.log('email 중복');
        res.send({
          message: 'email is exist'
        })
      } else {
        bcrypt.hash(password, null, null, function (err, hash) {
          if (err) {
            console.log(err);
            res.send({
              message: err
            });
          } else {
            console.log(hash);
            const user = {
              email,
              username,
              password: hash,
              meta_address: metaAddress
            }
            saveUser(user, (err, result) => {
              if (err) {
                res.send({
                  message: err,
                  success: result
                });
              } else {
                checkUser(email, null, (err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                    sendMail(email, result.id);
                    res.send({
                      message: 'complete signup',
                      success: result
                    })
                  }
                })
              }
            })
          }
        });
      }
    }
  })
}

module.exports = signup;