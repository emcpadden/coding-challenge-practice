const express = require('express');
const router = express.Router();

function createAuthRouter({userService}) {
    var userService = userService;

    function sendAuthError(next) {
        next({
            status: 400,
            message: "email or password incorrect"
        });
    }

    return function() {
        router.post('/login', (req, res, next) => {
            var token = userService.createUserToken(req.body.username, req.body.password)
            if (!!token) {
                var user = userService.getUserByUsername(req.body.username, false);
                res.json({ username: req.body.username, token, user });
            } else {
                sendAuthError(next);
            }
        });
        
        router.post('/register', (req, res) => {
            res.send(`register`)
        });

        return router;
    }
}


module.exports = createAuthRouter;