const router = require('express').Router();
const verify = require('./verify');
const signin = require('./signin');
const signup = require('./signup');
const verifyEmail = require('./verify_email');

const github = require('./github');
const google = require('./google');
const facebook = require('./facebook');



router.get('/verify', verify);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyemail/*', verifyEmail);

router.post('/github', github);
router.post('/google', google);
router.post('/facebook', facebook);


module.exports = router