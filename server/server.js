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

var routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('API ready on port: ' + port);