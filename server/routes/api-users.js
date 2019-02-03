const express = require('express');
const checkRole = require('../utils/authHelper').checkRole;
const router = express.Router();

function createApiRouter({userService}) {
  var userService = userService;

  return function() {

    // get all users
    router.get('/', checkRole(['admin']), function(req, res, next) {
      var users = userService.getUsers();
      if (!!users) {
        res.json(users);
      } else {
        next({
          status: 500,
          message: 'unable to retrieve users'
        })
      }
    });

    // get a specific user
    router.get('/:id', checkRole(['admin']), function(req, res, next) {
        var user = userService.getUserById(req.params.id);
        if (!!user) {
            res.json(user);
        } else {
            next({
            status: 500,
            message: `unable to retrieve user for id: ${req.params.id}`
            })
        }
    });

    // get a specific user
    router.post('/:id', checkRole(['admin']), function(req, res, next) {
        var user = userService.getUserById(req.params.id);
        var userProfile = req.body;
        if (!user) {
            // if we don't find the user, return a 404 error
            next({
                status: 404,
                message: `unable to find user profile for id: ${req.params.id}`
            });
            return;
        }
        if ( user.id != userProfile.id || user.username != userProfile.username) {
            // don't allow the caller to change the id or the username return a 400 error
            next({
                status: 400,
                message: `Not allowed to change the id or username of a user`
            });
            return;
        }
        // if all is OK, then update the user with the new userProfile
        var updatedUser = userService.updateUserProfile(userProfile);
        if (!!updatedUser) {
            res.json(updatedUser);
        } else {
            next({
                status: 500,
                message: `unable to update user profile for id: ${req.params.id}`
            });
            return;
        }
    });
    
    return router;
  }

}

module.exports = createApiRouter;
