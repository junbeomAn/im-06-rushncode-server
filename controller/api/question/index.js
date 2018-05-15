const router = require('express').Router();
const postQuestion = require('./postQuestion');
const getList = require('./getList');
const leaveAnswer = require('./leaveAnswer');
const leaveChAnswer = require('./leaveChAnswer');
const displayQ = require('./displayQ');
const handleUpdateGood = require('./handleUpdateGood');
const getTag = require('./getTagList');




router.post('/post', postQuestion);
router.get('/getlist', getList);
router.post('/answer', leaveAnswer);
router.post('/chanswer', leaveChAnswer);
router.get('/displayq/*', displayQ);
router.post('/good/*', handleUpdateGood);
router.get('/gettag', getTag);



module.exports = router