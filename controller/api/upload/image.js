/*
    POST /api/upload/image

    {
      
    }
*/
const Promise = require("bluebird");
const sharp = require("sharp");
const saveImagePath = Promise.promisify(require("../../../model/saveImagePath"));
const verifyToken = Promise.promisify(require("../../utillity/verifyToken"));


const image = (req, res) => {
  //console.log(req);
  const token = req.headers['x-access-token'] || req.query.token;
  console.log(req);
  let imageFile = req.files.myFile;
  verifyToken(token).then((email) => {
    checkUser(email).then(user => {
      mkdirp(`${process.cwd()}/client/src/images/profile/userImage-${user.id}`, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
      });
      const path = `${process.cwd()}/client/src/images/profile/userImage-${user.id}/${user.id}.png`;
      sharp(imageFile.data)
        .resize(230, 230)
        .toFile(`${process.cwd()}/client/src/images/profile/userImage-${user.id}/${user.id}.png`, (err, info) => {
          if(err) {
            res.status(500).send(err); 
          } else {
            saveImagePath(userID, path).then(() => {
              res.send({
                message: 'success',
                path: `../../images/profile/userImage-${user.id}/${user.id}.png`
              });
            })
          }
        });
  });
});
}

module.exports = image;