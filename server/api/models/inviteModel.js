'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var InviteeSchema = new Schema({
  id: String,
  status: {
    type: String,
    enum: ['accepted', 'declined', 'unanswered'],
    default: 'unanswered',
  },
});

var InviteSchema = new Schema({
  title: String,
  showtime: Object,
  location: {
    name: String,
    lat: String,
    long: String,
    address: String,
  },
  movie: Object,
  runtime: String,
  rating: String,
  thumbnail: String,
  backdrop: String,
  myStatus: String,
  theater: Object,
  organizer: {
    id: String,
    name: String,
  },
  notes: String,
  movie_id: String,
  host_id: String,
  invitees: [InviteeSchema],
});

module.exports = mongoose.model('Invites', InviteSchema);
