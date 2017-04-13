const Keycloak = require('keycloak-connect');
const fs = require('fs');
//const session = require('express-session');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var keystore = require('./keystore.json');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoHost = process.env.MONGOHOST || 'localhost';
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//TODO: connect to configuration mongodb
mongoose.connect('mongodb://' + mongoHost + '/mongodb', function(err) {
    if (err) console.log('\x1b[31m%s\x1b[0m', '[ERROR]' ,'Can\'t connect to MongoDB. Try starting it up with `mongod`');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(expressJwt({secret: 'not sure what goes here for keycloak'}).unless({path: ['/login']}));
app.use(expressJwt(keystore).unless({path: ['/login', '/register']}));


app.keycloak = new Keycloak({});


app.use(app.keycloak.middleware());
app.use(app.keycloak.middleware( { logout: '/'} ));

var routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('API ready on port: ' + port);