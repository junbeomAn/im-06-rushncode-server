const router = require('express').Router();

const postQuestion = require('./postQuestion');
const getList = require('./getList');
const leaveAnswer = require('./leaveAnswer');
const leaveChAnswer = require('./leaveChAnswer');
const displayQ = require('./displayQ');
const handleQuestionGood = require('./handleQuestionGood');
const handleAnswerGood = require('./handleAnswerGood');
const getTag = require('./getTagList');
const modifyQuestion = require('./modifyQuestion');
const modifyAnswer = require('./modifyAnswer');
const leaveReply = require('./leaveReply');
const pickAnswer = require('./pickanswer');
const infoOfAnswer = require('./infoOfAnswer');


router.post('/post', postQuestion);
router.post('/answer', leaveAnswer);
router.post('/chanswer', leaveChAnswer);
router.post('/reply', leaveReply);
router.get('/gettag', getTag);
router.post('/pickanswer/*', pickAnswer);


router.post('/goodanswer/*', handleAnswerGood);
router.get('/getlist/*', getList);
router.get('/displayq/*', displayQ);
router.post('/good/*', handleQuestionGood);
router.post('/modifyquestion/*', modifyQuestion);
router.post('/modifyanswer/*', modifyAnswer);
router.get('/getanswer/*', infoOfAnswer);






module.exports = router