'use strict';

module.exports = function(app) {
  var movie = require('../controllers/movieController');

  app.route('/cinemas').get(movie.listCinemasByLocation);

  app.route('/movies').get(movie.listMoviesByCinema);
};
