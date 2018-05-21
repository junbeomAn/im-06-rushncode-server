const router = require('express').Router();
const auth = require('./auth');
const question = require('./question');
const mypage = require('./mypage');

router.use('/auth', auth);
router.use('/question', question);
router.use('/mypage', mypage);

module.exports = router;