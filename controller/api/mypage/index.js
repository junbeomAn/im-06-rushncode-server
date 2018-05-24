const router = require('express').Router();

const profile = require('./profile');
const getAnswers = require('./getAnswers');



router.get('/profile/*', profile);
router.get('/getanswers/*', getAnswers);



module.exports = router