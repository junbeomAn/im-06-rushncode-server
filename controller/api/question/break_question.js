/*
POST /api/question/breakquestion
{
  questionID
}
*/

const Promise = require('bluebird');

const updateStateOfQuestion = Promise.promisify(require("../../../model/update_state_of_question"));
const displayQ = (req, res) => {
  
};

module.exports = displayQ;
