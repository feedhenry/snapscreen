'use strict';

var jwt = require('jsonwebtoken');
var keystore = require('../../keystore.json');

exports.login = function(req, res) {

  //TODO: call keycloak to check login
  var myToken = jwt.sign({username:req.body.user}, keystore.secret);
  res.json({
    user: 'test',
    token: myToken
  });
};

exports.register = function(req, res) {
  var myToken = jwt.sign({username:req.body.user}, keystore.secret);
  res.json({
    user: 'test',
    token: myToken
  });
};
