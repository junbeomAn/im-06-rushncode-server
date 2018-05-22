const router = require('express').Router();

const search = require('./search');



router.post('/search', search);



module.exports = router