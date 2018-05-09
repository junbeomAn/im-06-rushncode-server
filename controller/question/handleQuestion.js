const postQuestion = require('./postQuestion');


exports.handlePost = (req, res) => {
    console.log(req.url);
    const uri = req.url.split('/')[2];

}

exports.handleGet = (req, res) => {
    res.send('auth');
}