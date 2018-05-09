const bcrypt = require('bcrypt-nodejs');
const model = require('../../model/signInSignUp');

const signUp = (req, res) => {
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

module.exports = signUp;