'use strict';

module.exports = function(app) {
  var invite = require('./inviteRoutes');
  var user = require('./userRoutes');
  var movie = require('./movieRoutes');

  invite(app);
  user(app);
  movie(app);
};
