const router = require('express').Router();

const profile = require('./profile');
const getAnswers = require('./get_answers');
const changeComment = require('./change_state_comment');

router.get('/profile/*', profile);
router.get('/getanswers/*', getAnswers);
router.post('/updatestatus/*', changeComment);

module.exports = router;
