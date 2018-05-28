const router = require('express').Router();

const deleteAnswer = require('./delete_answer');
const deleteChAnswer = require('./delete_ch_answer');
const deleteQuestion = require('./delete_question');
const deleteReply = require('./delete_reply');



router.post('/answer/*', deleteAnswer);
router.post('/chanswer/*', deleteChAnswer);
router.post('/question/*', deleteQuestion);
router.post('/reply/*', deleteReply);



module.exports = router