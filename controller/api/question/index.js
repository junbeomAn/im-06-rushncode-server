const router = require('express').Router();

const postQuestion = require('./post_question');
const getList = require('./get_list');
const leaveAnswer = require('./leave_answer');
const leaveChAnswer = require('./leave_ch_answer');
const displayQ = require('./display_question');
const handleQuestionGood = require('./handle_question_good');
const handleAnswerGood = require('./handle_answer_good');
const getTag = require('./get_tag_list');
const modifyQuestion = require('./modify_question');
const modifyAnswer = require('./modify_answer');
const leaveReply = require('./leave_reply');
const pickAnswer = require('./pick_answer');
const infoOfAnswer = require('./info_of_answer');


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
router.post('/modifyquestion', modifyQuestion);
router.post('/modifyanswer', modifyAnswer);
router.get('/getanswer/*', infoOfAnswer);


module.exports = router;
