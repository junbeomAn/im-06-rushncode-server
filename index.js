var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '/client/public')));

app.get('/test', function (req, res) {
    res.send('Hello World');
})

app.listen(3001);
console.log('listening, 3001');