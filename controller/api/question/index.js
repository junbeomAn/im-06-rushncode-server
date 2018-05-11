const router = require('express').Router();
const postQuestion = require('./postQuestion');
const getList = require('./getList');
const leaveAnswer = require('./leaveAnswer');
const leaveChAnswer = require('./leaveChAnswer');

const test = require('./test');



router.post('/post', postQuestion);
router.get('/getlist', getList);
router.post('/answer', leaveAnswer);
router.post('/chanswer', leaveChAnswer);


router.post('/test', test);


module.exports = router