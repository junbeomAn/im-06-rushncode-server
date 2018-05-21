const router = require('express').Router();

const deleteAnswer = require('./deleteAnswer');
const deleteChAnswer = require('./deleteChAnswer');
const deleteQuestion = require('./deleteQuestion');
const deleteReply = require('./deleteReply');



router.post('/answer/*', deleteAnswer);
router.post('/chanswer/*', deleteChAnswer);
router.post('/question/*', deleteQuestion);
router.post('/reply/*', deleteReply);



module.exports = router