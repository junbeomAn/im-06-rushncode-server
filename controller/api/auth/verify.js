/*
    GET /api/auth/verify
*/

const jwt = require('jsonwebtoken');
const verify = (req, res) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token
    console.log(token);
    // token does not exist
    if (token) {
        jwt.verify(token, 'rushncode', (err, decoded) => {
            if (err) res.send(err);
            else {
                console.log('decoded@@@#@#', decoded);
                res.send({
                    success: true,
                    info: decoded
                })
            }
        });
    } else {
        res.send({
            success: false,
            message: 'not logged in'
        })
    }
}

module.exports = verify;