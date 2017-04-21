const Keycloak = require('keycloak-connect');
const fs = require('fs');
const session = require('express-session');
//var expressJwt = require('express-jwt');
//var jwt = require('jsonwebtoken');
//var key = require('./keycloak.json');


var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoHost = process.env.MONGOHOST || 'localhost';
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//TODO: connect to configuration mongodb  mongodb://mongo-controller/snapscreen
/*mongoose.connect('mongodb://mongodb:mongodb@' + mongoHost + '/snapscreen', function(err) {
    if (err) console.log('\x1b[31m%s\x1b[0m', '[ERROR]' ,'Can\'t connect to MongoDB. Try starting it up with `mongod`');
});*/
mongoose.connect('mongodb://'+ mongoHost + '/snapscreen', function(err) {
  if (err) console.log('\x1b[31m%s\x1b[0m', '[ERROR]' ,'Can\'t connect to MongoDB. Try starting it up with `mongod`');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//pulled back in sessions as all the examples have it ???
////////////////////////////////////////////////////////////////////////////////////
/*app.use(session({
  secret:'password',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


var memoryStore = new session.MemoryStore();
app.keycloak = new Keycloak({ store: memoryStore });*/
app.keycloak = new Keycloak({});

app.use(app.keycloak.middleware());
app.use(app.keycloak.middleware( { logout: '/'} ));

// endpoint tests
app.get('/test', app.keycloak.protect(), function(req, res){
  res.json({
    user: 'test',
    route: 'test',
    token: myToken
  });
});

app.get('/test2', function(req, res){
  res.json({message: 'test2'});
});
///////////////////////////////////////////////////////////////////////////////////

var routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('API ready on port: ' + port);