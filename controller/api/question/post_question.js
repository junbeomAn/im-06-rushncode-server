/*
    POST /api/question/post
    {
        title,
        body,
        reward,
        tags //array(3)
    }
*/

const Promise = require('bluebird');

const saveQuestion = Promise.promisify(require('../../../model/save_question'));
const checkUser = Promise.promisify(require('../../../model/check_user'));
const checkTag = Promise.promisify(require('../../../model/check_tag'));
const checkQuestion = Promise.promisify(require('../../../model/check_question'));
const saveQnTag = Promise.promisify(require('../../../model/save_q_n_tag'));
const updateNumOfQuestions = Promise.promisify(require('../../../model/update_num_of_questions'));
const verifyToken = Promise.promisify(require('../../utillity/verify_token'));

const postQuestion = (req, res) => {
  const { reward, tags } = req.body;
  const title = JSON.stringify(req.body.title);
  const body = JSON.stringify(req.body.body);
  console.log(body);
  const token = req.headers['x-access-token'] || req.query.token;

  const data = { title, body, reward };

  verifyToken(token).then((email) => {
    checkUser(email, null).then((result) => {
      console.log('@#@#@#@#@#@#####', result);
      const userID = result.id;
      saveQuestion(data, userID).then(() => {
        checkQuestion(data, userID, null).then((question) => {
          const qID = question.id;
          checkTag(tags).then((t) => {
            saveQnTag(t, qID).then((a) => {
              updateNumOfQuestions(userID).then(() => {
                res.send({
                  message: 'success',
                  questionID: qID,
                });
              });
            });
          });
        });
      });
    });
  });
  // checkUser(email, (err, result) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         if (result) {

  //             saveQuestion(data, (err, result) => {
  //                 if (err) {
  //                     res.send({
  //                         message: err
  //                     });
  //                 } else {
  //                     checkQuestion(data, (err, result) => {
  //                         if (err) {
  //                             res.send(err);
  //                         } else {
  //                             if (result) {
  //                                 checkTag(tags, (err, result) => {
  //                                     if (err) {
  //                                         console.log(err);
  //                                     } else {

  //                                     }
  //                                 })
  //                             } else {
  //                                 res.send()
  //                             }
  //                         }
  //                     })
  //                     res.send({
  //                         message: result
  //                     })
  //                 }
  //             })
  //         } else {
  //             res.send({
  //                 message: 'email is not exist'
  //             });
  //         }
  //     }
  // })
};

module.exports = postQuestion;
