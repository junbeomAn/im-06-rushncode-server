const router = require('express').Router();
const auth = require('./auth');
const question = require('./question');
const mypage = require('./mypage');
const del = require('./delete');
const sort = require('./sort');
const upload = require('./upload');

router.use('/auth', auth);
router.use('/question', question);
router.use('/mypage', mypage);
router.use('/delete', del);
router.use('/sort', sort);
router.use('/upload', upload);

module.exports = router;
