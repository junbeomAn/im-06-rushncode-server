/*
    GET /api/question/gettag
*/

const Promise = require("bluebird");

const getTagList = Promise.promisify(require("../../../model/get_tag_list"));

const getTag = (req, res) => {
  getTagList().then((result) => {
    res.send({
      data: result
    });
  });
}

module.exports = getTag;