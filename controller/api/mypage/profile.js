/*
    GET /api/mypage/profile/{userID}
*/
const Promise = require('bluebird');

const checkUser = Promise.promisify(require("../../../model/checkUser"));
const getPickedAnswers = Promise.promisify(require("../../../model/getPickedAnswers"));
const getProfileInfo = Promise.promisify(require("../../../model/getProfileInfo"));
const getUserInfo = Promise.promisify(require("../../../model/getUserInfo"));
const getQuestionsList = Promise.promisify(require("../../../model/getQuestionsList"));
const getAnswers = Promise.promisify(require("../../../model/getAnswers"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));

const profile = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const userID = req.url.split('/')[2];
  let data = null;
  verifyToken(token).then((email) => {
    checkUser(email).then((result) => {
      getUserInfo(userID).then((user) => {
        data = {
          email: user.email,
          username: user.username,
        };
        getPickedAnswers(userID).then((pickedAnswers) => {
          getProfileInfo(userID).then((info) => {
            data.pickedAnswers = pickedAnswers.pickedAnswers;
            data.numOfAnswers = info.num_of_answers;
            data.numOfChooseAnswers = info.choose_answers;
            data.numOfQuestions = info.num_of_questions;
            data.questions = [];
            data.answers = [];
            getQuestionsList('normal', null, null, null, userID).then((questions) => {
              getAnswers(null, userID).then((answers) => {
                if(questions) {
                  for (var i = 0; i < questions.length; i++) {
                    if (questions[i].tags === null) {
                      questions[i].tags = [];
                    } else {
                      questions[i].tags = questions[i].tags.split(',');
                    }
                  }
                  data.questions = questions;
                }
                if(answers) {
                  data.answers = answers;
                }
                res.send({
                  message: 'good',
                  data
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = profile;
