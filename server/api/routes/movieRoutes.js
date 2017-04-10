'use strict';

module.exports = function(app) {
  var invite = require('../controllers/movieController');

  app.route('/movies')
    .get(invite.listMoviesNearby);

};
