'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  phone: String,
});

module.exports = mongoose.model('User', UserSchema);
