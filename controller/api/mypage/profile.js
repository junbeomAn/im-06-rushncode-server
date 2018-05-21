/*
    GET /api/question/getlist
*/
const Promise = require("bluebird");
const getPickedAnswers = Promise.promisify(require("../../../model/getPickedAnswers"));
const getNumOfAnswers = Promise.promisify(require("../../../model/getNumOfAnswers"));
const getNumOfChooseAnswers = Promise.promisify(require("../../../model/getNumOfChooseAnswers"));
const getNumOfQuestions = Promise.promisify(require("../../../model/getNumOfQuestions"));

const getList = (req, res) => {
  const userID = req.url.split('/')[2];
  var data = null;
  getPickedAnswers(userID).then((pickedAnswers) => {
    getNumOfAnswers(userID).then((numOfAnswers) => {
      getNumOfChooseAnswers(userID).then((numOfChooseAnswers) => {
        getNumOfQuestions(userID).then((numOfQuestions) => {
          data = { 
            pickedAnswers: pickedAnswers[0].pickedAnswers, 
            numOfAnswers: numOfAnswers[0].num_of_answers, 
            numOfChooseAnswers: numOfChooseAnswers[0].choose_answers, 
            numOfQuestions: numOfQuestions[0].num_of_questions
          }
          res.send({
            message: 'good',
            data
          });
        });
      });
    });
  });

}

module.exports = getList;