const router = require('express').Router();
const verify = require('./verify');
const signin = require('./signin');
const signup = require('./signup');
const sendMail = require('./sendMail');


router.get('/verify', verify);
router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router