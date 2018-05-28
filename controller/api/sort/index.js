const router = require('express').Router();

const search = require('./search');
const sortByView = require('./sort_by_view');
const sortByGood = require('./sort_by_good');
const sortByReward = require('./sort_by_reward');
const sortByTag = require('./sort_by_tag');



router.post('/search/*', search);
router.post('/tag/*', sortByTag);
router.get('/view/*', sortByView);
router.get('/good/*', sortByGood);
router.get('/reward/*', sortByReward);


module.exports = router;