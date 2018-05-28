/*
    POST /api/upload/image

    {

    }
*/
const Promise = require('bluebird');
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const updateImagePath = Promise.promisify(require('../../../model/update_image_path'));
const checkUser = Promise.promisify(require('../../../model/check_user'));
const verifyToken = Promise.promisify(require('../../utillity/verify_token'));

const image = (req, res) => {
  // console.log(req);
  const token = req.headers['x-access-token'] || req.query.token;
  console.log(req);
  const imageFile = req.files.myFile;
  verifyToken(token).then((email) => {
    checkUser(email).then((user) => {
      mkdirp(`${process.cwd()}/public/image/profile/userImage-${user.id}`, (err) => {
        if (err) console.error(err);
        else console.log('pow!');
      });
      const path = `userImage-${user.id}/${user.id}`;
      sharp(imageFile.data)
        .resize(230, 230)
        .toFile(
          `${process.cwd()}/public/image/profile/userImage-${user.id}/${user.id}.png`,
          (err, info) => {
            if (err) {
              res.status(500).send(err);
            } else {
              sharp(imageFile.data)
                .resize(40, 40)
                .toFile(
                  `${process.cwd()}/public/image/profile/userImage-${user.id}/${
                    user.id
                  }_mini.png`,
                  (err, info) => {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      updateImagePath(user.id, path).then(() => {
                        res.send({
                          message: 'success',
                          path: `userImage-${user.id}/${user.id}`,
                        });
                      });
                    }
                  },
                );
            }
          },
        );
    });
  });
};

module.exports = image;
