var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/index');
var handleQ = require('./controller/question');
var handleSign = require('./controller/signInSignUp');

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

app.post('/signin', handleSign.signin);
app.post('/signup', handleSign.signup);

app.get('/getQlist', handleQ.getQlist);
app.get('/question/:id', handleQ.getQuestion);
app.post('/question', handleQ.postQuestion);

app.listen(3001);
console.log('listening, 3001');