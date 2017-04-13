'use strict';

module.exports = function(app) {
  var user = require('../controllers/userController');


  app.route('/login',app.keycloak.protect())
      .post(user.login)
      .get(user.login);//added a get for testing

  app.route('/register', app.keycloak.protect())
    .post(user.register)
    .get(user.register);

};
