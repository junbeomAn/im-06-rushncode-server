/*
    POST /api/upload/image

    {

    }
*/
const Promise = require('bluebird');

const questionsList = Promise.promisify(require('../../../model/getQuestionsList'));

const image = (req, res) => {
  console.log('@@@@@@@', req.files);
  const imageFile = req.files.myFile;
  imageFile.mv(`${process.cwd()}/client/public/${imageFile.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `public/${imageFile.name}` });
  });
};

module.exports = image;
