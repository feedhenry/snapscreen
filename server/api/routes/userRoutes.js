'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/login')
    .post(user.login);

  app.route('/register')
    .post(user.register);

};
