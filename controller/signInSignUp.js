var bcrypt = require('bcrypt-nodejs');
var model = require('../model/signInSignUp');

exports.test = (req, res) => {

}

exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    console.log(req.body);
    model.checkUsername(email, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            if (result.length !== 0) {
                bcrypt.compare(password, result[0].password, function (err, truth) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (truth) {
                            console.log('login success');
                            res.send('success');
                            return;
                        } else {
                            console.log('login fail');
                            res.send(false);
                            return;
                        }
                    }
                });
            } else {
                console.log('not exist');
                res.send('not exist');
            }
        }
    })
}

exports.signup = (req, res) => {
    const {
        email,
        username,
        password
    } = req.body;
    console.log('@@@@@@@', req.body);

    model.checkUsername('asdf', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length !== 0) {
                console.log('id 중복');
                res.send(false)
            } else {
                bcrypt.hash(password, null, null, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.send();
                    } else {
                        console.log(hash);
                        const user = {
                            email,
                            username,
                            password: hash
                        }
                        model.saveUser(user, (err, result) => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send(result)
                            }
                        })
                    }
                });
            }
        }
    })


}