/*
    GET /api/question/getlist
*/
const Promise = require("bluebird");
const db = require('../../../db/index');
const questionsList = Promise.promisify(require("../../../model/getQuestionsList"));
const tagsOfQuestion = Promise.promisify(require("../../../model/getTagsOfQuestion"));

const getList = (req, res) => {
  var data = null;
  questionsList().then((questions) => {
    data = questions;
    tagsOfQuestion(null).then((tags) => {
      data.map(item => {
        item.tags = [];
        tags.map(tag => {
          if (item.id === tag.questionID) {
            item.tags.push(tag.tag);
          }
        })
      })
      console.log(tags);
      res.send({
        message: 'good',
        data: data
      });
    });


  })

  // if (err) {
  //   res.send({
  //     message: err
  //   })
  // } else {
  //   res.send({
  //     message: 'good',
  //     data: result
  //   })
  // }


}

module.exports = getList;