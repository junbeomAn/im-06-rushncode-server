const router = require('express').Router();

const profile = require('./profile');



router.get('/profile/*', profile);



module.exports = router