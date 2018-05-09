//var handleQ = require('./controller/question');
var auth = require('./auth/handleAuth');
var question = require('./question/handleQuestion');

const requestHandle = (app) => {
    app.post('/auth/*', auth.handlePost);
    app.get('/auth/*', auth.handleGet);

    app.post('/question/*', question.handlePost);
    app.get('/question/*', question.handleGet);


    app.get('/test/*', function (req, res) {
        console.log(req.url.split('/'));
        res.send('hi');
    });


}

module.exports = requestHandle;