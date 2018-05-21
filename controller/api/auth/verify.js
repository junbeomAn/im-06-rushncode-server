/*
    GET /api/auth/verify
*/

const Promise = require("bluebird");
const jwt = require('jsonwebtoken');
const checkUser = Promise.promisify(require("../../../model/checkUser"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const verify = (req, res) => {
  // read the token from header or url 
  const token = req.headers['x-access-token'] || req.query.token;
  console.log(token);

  verifyToken(token)
    .then((email) => {
      checkUser(email).then((user) => {
        res.send({
          success: true,
          email: user.email,
          userID: user.id
        })
      })
    })
    .catch((err) => {
      res.send({
        success: false,
        message: err
      })
    })
}

module.exports = verify;