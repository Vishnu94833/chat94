let jwt = require('jsonwebtoken');

const obj = require('../config/auth.js')
const secret = obj.secret;
let auth = function (req, res, next) {
    //next();
    let token = req.headers["token"];
    let respo = {
        'message': "Unauthorised Entry "
    };
    console.log("in auth ", token);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(err)
            return res.status(401).send(respo);
        }
        else {
            console.log(decoded);
            next();
        }
    });
    //next();
}
module.exports = auth;