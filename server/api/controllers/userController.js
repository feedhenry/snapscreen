'use strict';

exports.login = function(req, res) {
  //TODO: call keycloak to check login
  res.json({
    user: 'test'
  });
};

exports.register = function(req, res) {
  res.json({
    user: 'test'
  });
};
