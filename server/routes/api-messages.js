const express = require('express');
const checkRole = require('../utils/authHelper').checkRole;
const router = express.Router();

function createApiRouter({userService}) {
  var userService = userService;

  return function() {

    // get information about the currently logged in user
    router.get('/', checkRole(['user']), function(req, res, next) {
        /*
      var user = userService.getUserById(req.user.id);
      if (!!user) {
        res.json(user);
      } else {
        next({
          status: 500,
          message: 'unable to retrieve user'
        })
      }
      */
     // TODO: this should come from a service
     res.json([{
         id: 0,
         user: "Ed McPadden",
         message: "Hello"
     }])
    });
    
    return router;
  }
}

module.exports = createApiRouter;
