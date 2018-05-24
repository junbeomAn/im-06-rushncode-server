const router = require('express').Router();

const search = require('./search');
const sortByView = require('./sortByView');
const sortByGood = require('./sortByGood');
const sortByReward = require('./sortByReward');
const sortByTag = require('./sortByTag');



router.post('/search/*', search);
router.post('/tag/*', sortByTag);
router.get('/view/*', sortByView);
router.get('/good/*', sortByGood);
router.get('/reward/*', sortByReward);


module.exports = router;