const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret";

function createToken(user) {
    var tokenUser = Object.assign({}, user);
    delete tokenUser.password;
    var token = jwt.sign(tokenUser, JWT_SECRET);
    return token;
}

function addUserToRequest(req, res, next) {
    // check to see if there is an authenitcation token
    if (!!req.header('authorization')) {
        // if there is, attempt to decode it
        var parts = req.header('authorization').split(' ');
        if (!!parts && parts.length > 1) {
            if(parts[0].trim() == "Bearer") {
                var token = parts[1].trim();
                if (token.length > 0) {
                    var payload = jwt.decode(token, JWT_SECRET);
                    req.user = payload;
                } else {
                    next({
                        status: 400,
                        message: "no token specified after 'Bearer' on the Authorization header"
                    });
                }
            } else {
                next({
                    status: 400,
                    message: "no Bearer token found on the Authorization header"
                });
            }
        } else {
            next({
                status: 400,
                message: "Invalid Authorization header"
            });
        }
    }
    next();
}

function checkAuthenticated(req, res, next) {
    if (!req.user) {
        next({
            status: 401,
            message: 'Unauthorized requested. Missing authentication header'
        });
        return;
    }
    next();
}

function checkRole(role) {

    var roles = [];
    if (Array.isArray(role)) {
        roles = [...role];
    } else {
        roles.push(role);
    }

    return (req, res, next) => {
        var user = req.user;
        if (!!user) {
            var authorized = true;
            roles.forEach(r => {
                if(user.roles.find(ur => ur.trim().toUpperCase().localeCompare(r.trim().toUpperCase()) == 0) == null) {
                    authorized = false;    
                }
            });
            if (authorized) {
                next();
                return;
            }
        } 
        next({
            status: 403,
            message: 'Unauthorized requested. The user does not have the appropriate rights to make this request'
        });          
    }
}

module.exports.createToken = createToken;
module.exports.addUserToRequest = addUserToRequest;
module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkRole = checkRole;
