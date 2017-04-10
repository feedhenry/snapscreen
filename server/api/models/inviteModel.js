'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InviteeSchema = new Schema({
  invitee_id: String,
  status: {
    type: [{
      type: String,
      enum: ['accepted', 'declined', 'unanswered']
    }],
    default: ['unanswered']
  }
});

var InviteSchema = new Schema({
  movie_id: String,
  host_id: String,
  status: {
    type: [{
      type: String,
      enum: ['accepted', 'declined', 'unanswered']
    }],
    default: ['unanswered']
  },
  invitees: [InviteeSchema]
});

module.exports = mongoose.model('Invites', InviteSchema);
