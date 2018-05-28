const router = require('express').Router();
const verify = require('./verify');
const signin = require('./signin');
const signup = require('./signup');
const send_mail = require('./send_mail');
const verify_email = require('./verify_email');

const github = require('./github');
const google = require('./google');
const facebook = require('./facebook');

const test = require('./test');


router.get('/verify', verify);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyemail/*', verifyEmail);

router.post('/github', github);
router.post('/google', google);
router.post('/facebook', facebook);

router.post('/test', test);

module.exports = router