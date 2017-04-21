'use strict';
const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({});

var OnconnectAPI = require('onconnect-movies-api');
OnconnectAPI.init('gsje5sn4pu563gsrz24pr8zf');

exports.listMoviesNearby = keycloak.protect(), function(req, res) {
    OnconnectAPI.getMoviesByLocation(req.query.lat, req.query.lng, function(movies) {
        if(movies.error) {
        	res.status(500).send(movies);
        	return;
        }
        res.json(movies);
    });
};
