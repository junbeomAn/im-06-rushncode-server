const router = require('express').Router();

const profile = require('./profile');
const getAnswers = require('./get_answers');

router.get('/profile/*', profile);
router.get('/getanswers/*', getAnswers);

module.exports = router;
