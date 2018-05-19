/*
    GET /api/question/getNumOfChooseQuestions
*/

const Promise = require("bluebird");

const updateNumOfChooseQuestions = Promise.promisify(require("../../../model/updateNumOfChooseQuestions"));

const getNumOfChooseQuestions = (req, res) => {
    res.send();
}

module.exports = getNumOfChooseQuestions;