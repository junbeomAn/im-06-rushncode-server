const bcrypt = require("bcrypt-nodejs");
const model = require("../../model/signInSignUp");

const signin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  model.checkEmail(email, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length !== 0) {
        bcrypt.compare(password, result[0].password, function(err, truth) {
          if (err) {
            console.log(err);
          } else {
            if (truth) {
              console.log("login success");
              res.redirect("http://localhost:3000/");
              //   res.send('success');
              return;
            } else {
              console.log("login fail");
              res.send(false);
              return;
            }
          }
        });
      } else {
        console.log("not exist");
        res.send("not exist");
      }
    }
  });
};

module.exports = signin;
