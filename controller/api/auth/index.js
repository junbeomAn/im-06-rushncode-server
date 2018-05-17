const router = require('express').Router();
const verify = require('./verify');
const signin = require('./signin');
const signup = require('./signup');
const sendMail = require('./sendMail');
const verifyEmail = require('./verifyemail');


router.get('/verify', verify);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyemail/*', verifyEmail);


module.exports = router