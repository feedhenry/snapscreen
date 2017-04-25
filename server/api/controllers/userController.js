'use strict';

var jwt = require('jsonwebtoken');
var key= require('../../keycloak.json');
const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({});


exports.login = keycloak.protect(), function (req, res) {

  //TODO: call keycloak to check login
  var myToken = jwt.sign({username: req.body.user}, key.client_key_password);
  res.json({
    user: 'test',
    route: 'login',
    token: myToken
  });
};


exports.register = keycloak.protect(), function(req, res) {
  var myToken = jwt.sign({username:req.body.user}, key.client_key_password);
  res.json({
    user: 'test',
    route: 'register',
    token: myToken
  });
};
