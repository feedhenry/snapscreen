'use strict';
const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({});

module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/login').post(user.login).get(user.login); //added a get for testing

  app.route('/register').post(user.register).get(user.register); //added a get for testing
};
