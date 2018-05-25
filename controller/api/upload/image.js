/*
    POST /api/upload/image

    {
      
    }
*/
const Promise = require("bluebird");

const questionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const image = (req, res) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });
}

module.exports = image;