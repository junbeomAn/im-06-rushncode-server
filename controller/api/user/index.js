const router = require('express').Router();

const getRankOfUsers = require('./get_rank_of_users');

router.get('/rank', getRankOfUsers);

module.exports = router;