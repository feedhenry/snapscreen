var fs = require('fs');
var Keycloak = require('keycloak-connect');
var session = require('express-session');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwtDecoder = require('./middleware/jwtDecoder');
var routes = require('./api/routes');
require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;
var mongoHost = process.env.MONGOHOST || 'localhost';

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + mongoHost + '/snapscreen',
  function(err) {
    if (err)
      console.log(
        '\x1b[31m%s\x1b[0m',
        '[ERROR]',
        "Can't connect to MongoDB. Try starting it up with `mongod`"
      );
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// keycloak-connect needs an object for new Keycloak() to compile
app.keycloak = new Keycloak({});

app.use(app.keycloak.middleware());
app.use(jwtDecoder.jwtDecoder);
app.use(app.keycloak.middleware({ logout: '/' }));

// endpoint tests
app.get('/test', app.keycloak.protect(), function(req, res) {
  res.json({ message: 'test' });
});
// endpoint test
app.get('/test2', function(req, res) {
  res.json({ message: 'test2' });
});

routes(app);

app.listen(port);

console.log('API ready on port: ' + port);
