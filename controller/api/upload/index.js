const router = require('express').Router();

const image = require('./image');


router.put('/image', image);



module.exports = router