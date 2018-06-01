/*
    POST /api/question/pickanswer/{answerID}
    
*/

const Promise = require('bluebird');

const updatePickStateAnswer = Promise.promisify(require("../../../model/update_pick_state_answer"));
const updateNumOfChooseAnswers = Promise.promisify(require("../../../model/update_num_of_choose_answers"));
const checkUser = Promise.promisify(require("../../../model/check_user"));
const getQuestionID = Promise.promisify(require("../../../model/get_question_id"));
const updateStateOfQuestion = Promise.promisify(require("../../../model/update_state_of_question"));
const checkQuestion = Promise.promisify(require("../../../model/check_question"));
const verifyToken = Promise.promisify(require("../../utillity/verify_token"));

const pickAnswer = (req, res) => {
  const answerID = req.url.split('/')[2];
  const token = req.headers['x-access-token'] || req.query.token;

  verifyToken(token).then((email) => {
    checkUser(email, null).then((user) => {
      getQuestionID(answerID).then((answer) => {
        checkQuestion(null, null, answer.questionID).then((question) => {
          if(question.exist_picked_ans === 1) {
            res.send({
              message: 'already picked answer of this question'
            })
          } else {
            updateNumOfChooseAnswers(user.id).then(() => {
              updatePickStateAnswer(answerID).then(() => {
                updateStateOfQuestion(question.id, 'pick').then(() => {
                  checkUser(null, answer.userID).then((ansUser) => {
                    res.send({
                      message: 'good',
                      data: {
                        metaAddress: ansUser.meta_address
                      }
                    });
                  });
                }).catch(err => console.log(err))
              });
            });
          }
        });
      });
    });
  });
}

module.exports = pickAnswer;
