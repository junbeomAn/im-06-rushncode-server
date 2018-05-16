const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rushncode@gmail.com',
    pass: 'a0123456#'
  }
});

const sendMail = (target) => {
  bcrypt.hash(target, null, null, function (err, hash) {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'rushncode@gmail.com',
        to: 'rushncode@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `http://localhost:3001/verifymail/${hash}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  })
}

module.exports = sendMail;