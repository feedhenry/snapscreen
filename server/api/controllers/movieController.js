'use strict';

var CinepassAPI = require('cinepass-api');
CinepassAPI.init('dh0xy0m0LQZXqvLVMscUWA70jAeRpyLx');

exports.listCinemasByLocation = function(req, res) {
    var location = ''
    if(req.query.lat && req.query.lng) {
    	location = req.query.lat + ',' + req.query.lng;
    } else {
    	res.status(500).send({error: true, errorMessage: 'lat and lng are required parameters'});
    	return;
    }

    CinepassAPI.getCinemas({ location:location, distance:20 }, function(cinemas) {
        if(cinemas.error) {
        	res.status(500).send(cinemas);
        	return;
        }
        res.json(cinemas);
    });
};

exports.listMoviesByCinema = function(req, res) {
    var cinemaId = ''
    if(req.query.cinema_id) {
    	cinemaId = req.query.cinema_id;
    } else {
    	res.status(500).send({error: true, errorMessage: 'cinema_id is a required parameters'});
    	return;
    }

    CinepassAPI.getShowTimes({ cinema_id: cinemaId }, function(showtimes) {
    	if(showtimes.error) {
        	res.status(500).send(showtimes);
        	return;
        }

        var showTimesByMovie = {};
        showtimes.forEach(function(showTime){
        	if(showTimesByMovie[showTime.movie_id]) {
        		showTimesByMovie[showTime.movie_id].push(showTime);
        	} else {
        		showTimesByMovie[showTime.movie_id] = [showTime];
        	}
        });

    	CinepassAPI.getMovies({ cinema_id: cinemaId }, function(movies) {
	        if(movies.error) {
	        	res.status(500).send(movies);
	        	return;
	        }

	        res.json(movies.map(function(movie){
	        	return {
	        		id: movie.id,
	        		title: movie.title,
	        		showtimes: showTimesByMovie[movie.id]
	        	}
	        }));
	    });
    });
};
