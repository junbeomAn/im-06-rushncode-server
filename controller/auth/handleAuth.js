const signIn = require('./signIn');
const signUp = require('./signUp');
const sendMail = require('./sendMail');

exports.handlePost = (req, res) => {
    console.log(req.url);
    const uri = req.url.split('/')[2];
    if (uri === 'signin') {
        signIn(req, res);
    } else if (uri === 'signup') {
        signUp(req, res);
    }
}

exports.handleGet = (req, res) => {
    res.send('auth');
}