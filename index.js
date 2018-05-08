var express = require('express');
var cors = require('cors');
var path = require('path');
var app = require(__dirname + '/app.js');
//var app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, '/client/public')));
console.log(__dirname);
app.get('/test', function (req, res) {
    res.send('Hello World');
})

app.listen(3001);
console.log('listening');