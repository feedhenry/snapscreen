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

    CinepassAPI.getCinemas({ location: location }, function(cinemas) {
        if(cinemas.error) {
        	res.status(500).send(cinemas);
        	return;
        }
        res.json(cinemas);
    });
};

function _getBackDrop (posters) {
	if (!posters || posters.length === 0) {
		return null;
	}

	var toReturn = null;

	return posters.reduce(function (acc, val) {
		if (!acc) {
			return val;
		} else {
			if (val.size.width > acc.size.width) {
				return val
			} else {
				return acc
			}
		}
	}).url;
};


function _getRating(ratings) {

	if (!ratings) {
		return 0;
	} else {
		if (ratings['tmdb']) {
			return ratings['tmdb'].value / 10;
		} else {
			return 0;
		}
	}

}

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
        		showTimesByMovie[showTime.movie_id].push({id:showTime.id, time:showTime.start_at});
        	} else {
        		showTimesByMovie[showTime.movie_id] = [{id:showTime.id, time:showTime.start_at}];
        	}
        });

    	CinepassAPI.getMovies({ cinema_id: cinemaId }, function(movies) {
	        if(movies.error) {
	        	res.status(500).send(movies);
	        	return;
	        }

	        res.json(movies.map(function(movie){
	        	return {
					movie: {
						id: movie.id,
	        			title: movie.title,
						synopsis: movie.synopsis,
						runtime: movie.runtime || 'Unlisted',
      					rating: _getRating(movie.ratings),
      					thumbnail: movie.poster_image_thumbnail,
      					backdrop: _getBackDrop(movie.poster_image.image_files),
					},
	        		showtimes: showTimesByMovie[movie.id]
	        	}
	        }));
	    });
    });
};
