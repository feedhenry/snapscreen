'use strict';

var jwt = require('jsonwebtoken');
var keycloak = require('../../keycloak.json');

exports.login = function(req, res) {

  //TODO: call keycloak to check login
  var myToken = jwt.sign({username:req.body.user}, "password");
  res.json({
    user: 'test',
    route: 'login',
    token: myToken
  });
};

exports.register = function(req, res) {
  var myToken = jwt.sign({username:req.body.user}, "password");
  res.json({
    user: 'test',
    route: 'register',
    token: myToken
  });
};
