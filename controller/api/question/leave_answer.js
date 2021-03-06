/*
    POST /api/question/answer
    {
        body,
        questionID
    }
*/

const Promise = require("bluebird");

const checkUser = Promise.promisify(require("../../../model/check_user"));
const saveAnswer = Promise.promisify(require("../../../model/save_answer"));
const updateNumOfAnswers = Promise.promisify(require("../../../model/update_num_of_answers"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));

const leaveAnswer = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const data = req.body;
  verifyToken(token).then((email) => {
    checkUser(email, null).then((result) => {
      if(result) {
        const userID = result.id;
        saveAnswer(data, userID).then(() => {
          updateNumOfAnswers(userID).then(() => {
            res.send({
              message : 'success'
            });
          })
        })
      } else {
        res.send('로그인 해라');
      }      
    });
  });
}

module.exports = leaveAnswer;