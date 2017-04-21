'use strict';

const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({});


exports.login = keycloak.protect(), function (req, res) {

  //TODO: call keycloak to check login
  res.json({
    user: 'test',
    route: 'login',
    token: myToken
  });
};


exports.register = keycloak.protect(), function(req, res) {
  res.json({
    user: 'test',
    route: 'register',
    token: myToken
  });
};
