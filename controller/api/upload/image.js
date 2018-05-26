/*
    POST /api/upload/image

    {
      
    }
*/
const Promise = require("bluebird");
const sharp = require("sharp");
const updateImagePath = Promise.promisify(require("../../../model/updateImagePath"));
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
      const path = `../../images/profile/userImage-${user.id}/`;
      sharp(imageFile.data)
        .resize(230, 230)
        .toFile(`${process.cwd()}/client/src/images/profile/userImage-${user.id}/${user.id}.png`, (err, info) => {
          if(err) {
            res.status(500).send(err); 
          } else {
            sharp(imageFile.data)
              .resize(40, 40)
              .toFile(`${process.cwd()}/client/src/images/profile/userImage-${user.id}/${user.id}_mini.png`, (err, info) => {
                if(err) {
                  res.status(500).send(err); 
                } else {
            
                  updateImagePath(user.id, path).then(() => {
                    res.send({
                      message: 'success',
                      path: `../../images/profile/userImage-${user.id}/${user.id}.png`
                    });
                  });
                }
              });
          }
        });
  });
});
}

module.exports = image;