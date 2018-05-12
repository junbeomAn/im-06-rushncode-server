/*
POST /api/question/chanswer
{
  body,
  questionID
}
*/

const Promise = require("bluebird");

const getQuestion = Promise.promisify(require("../../../model/getQuestion"));
const getAnswers = Promise.promisify(require("../../../model/getAnswers"));
const getChAnswers = Promise.promisify(require("../../../model/getChAnswers"));


const displayQ = (req, res) => {
  var data = {};
  const quesID = 1;
  getQuestion(quesID).then((ques) => {
    //console.log(ques);
    data = ques[0];
    getAnswers(quesID).then((answ) => {
      //console.log(answ);
      data.answers = {};
      answ.map((item, index) => {
        data.answers[item.aID] = item;
        data.answers[item.aID].chAnswers = [];
      })
      //console.log(data);
      getChAnswers(quesID).then((chAnsw) => {
        //console.log(chAnsw);
        chAnsw.map((item, index) => {
          data.answers[item.aID].chAnswers.push(item);
        })
        res.send(data);
      })
    })
  })
}

module.exports = displayQ;