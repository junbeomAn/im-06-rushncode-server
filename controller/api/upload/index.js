const router = require('express').Router();

const image = require('./image');


router.post('/image/*', image);



module.exports = router