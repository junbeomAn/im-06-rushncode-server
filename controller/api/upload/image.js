/*
    POST /api/upload/image

    {
      
    }
*/
const Promise = require("bluebird");
const sharp = require("sharp");
const questionsList = Promise.promisify(require("../../../model/getQuestionsList"));


const image = (req, res) => {
  //console.log(req);
  //const token = req.headers['x-access-token'] || req.query.token;

  let imageFile = req.files.myFile;
  sharp(imageFile.data)
    .resize(230, 230)
    .toFile(`${process.cwd()}/client/public/image/1/${imageFile.name}`, (err, info) => {
      if(err) {
        res.status(500).send(err); 
      } else {
        res.send(`./public/image/1/${imageFile.name}`);
      }
    });
  // imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   res.json({file: `public/${req.body.filename}.jpg`});
  // });
}

module.exports = image;