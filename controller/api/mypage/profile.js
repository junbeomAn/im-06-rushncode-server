/*
    GET /api/mypage/profile/{userID}
*/
const Promise = require('bluebird');

const checkUser = Promise.promisify(require('../../../model/check_user'));
const getPickedAnswers = Promise.promisify(require('../../../model/get_picked_answers'));
const getProfileInfo = Promise.promisify(require('../../../model/get_profile_info'));
const getUserInfo = Promise.promisify(require('../../../model/get_user_info'));
const getQuestionsList = Promise.promisify(require('../../../model/get_questions_list'));
const getUsersByRank = Promise.promisify(require('../../../model/get_users_by_rank'));
const verifyToken = Promise.promisify(require('../../utillity/verify_token'));

const profile = (req, res) => {
  const token = req.headers['x-access-token'] || req.query.token;
  const userID = Number(req.url.split('/')[2]);
  let data = null;
  let rank = null;
  verifyToken(token)
    .then((email) => {
      checkUser(email, null).then((result) => {
        getUserInfo(userID).then((user) => {
          data = {
            email: user.email,
            username: user.username,
          };
          getUsersByRank().then((usersByRank) => {
            for (let i = 0; i < usersByRank.length; i++) {
              if (usersByRank[i].id === userID) {
                rank = i + 1;
                break;
              }
            }
            // console.log('###', rank);
            getPickedAnswers(userID).then((pickedAnswers) => {
              getProfileInfo(userID).then((info) => {
                data.pickedAnswers = pickedAnswers.pickedAnswers;
                data.numOfAnswers = info.num_of_answers;
                data.numOfChooseAnswers = info.choose_answers;
                data.numOfQuestions = info.num_of_questions;
                data.image = info.image;
                data.total_reward = info.total_reward;
                data.rank = rank;
                data.percentageOfPicked =
                  info.num_of_questions === 0
                    ? 0
                    : info.choose_answers / info.num_of_questions * 100;
                data.percentageOfChoose =
                  info.num_of_answers === 0
                    ? 0
                    : pickedAnswers.pickedAnswers / info.num_of_answers * 100;
                data.questions = [];
                data.answers = [];
                getQuestionsList('normal', null, null, null, userID, null).then((questions) => {
                  getQuestionsList('normal', null, null, null, null, userID).then((answers) => {
                    if (questions) {
                      for (var i = 0; i < questions.length; i++) {
                        if (questions[i].tags === null) {
                          questions[i].tags = [];
                        } else {
                          questions[i].tags = questions[i].tags.split(',');
                        }
                      }
                      data.questions = questions;
                    }
                    if (answers) {
                      for (var i = 0; i < answers.length; i++) {
                        if (answers[i].tags === null) {
                          answers[i].tags = [];
                        } else {
                          answers[i].tags = answers[i].tags.split(',');
                        }
                      }
                      data.answers = answers;
                    }
                    res.send({
                      message: 'good',
                      data,
                    });
                  });
                });
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: 'invalid token',
        data: {},
      });
    });
};

module.exports = profile;
