'use strict';

var mongoose = require('mongoose');
var Invite = require('../models/inviteModel');
var agSender = require('unifiedpush-node-sender');

const settings = {
    url: process.env.UPS_URL,
    applicationId: process.env.UPS_APPLICATION_ID,
    masterSecret: process.env.UPS_MASTER_SECRET
  };

exports.listUserInvites = function(req, res) {
  var userId = req.user_id;
  if (!userId) {
    return res.status(403).send();
  }

  Invite.find(
    {
      $or: [{ host_id: userId }, { invitees: { $elemMatch: { id: userId } } }],
    },
    function(err, invites) {
      console.log(JSON.stringify(invites));
      if (err) res.status(500).send(err);
      res.json(invites);
    }
  );
};

exports.createInvite = function(req, res) {
  var userId = req.user_id;
  if (!userId) {
    return res.status(403).send();
  }

  console.log('body ' + JSON.stringify(req.body));
  req.body.host_id = userId;
  var inviteParam = req.body;
  var newInvite = new Invite(req.body);

  newInvite.title = inviteParam.movie.title;
  newInvite.location = {
    name: inviteParam.theater.name,
    lat: inviteParam.theater.location.lat,
    long: inviteParam.theater.location.lon,
    address: inviteParam.theater.location.address.display_text,
  };

  newInvite.theater = inviteParam.theater;
  newInvite.runtime = inviteParam.movie.runtime;
  newInvite.rating = inviteParam.movie.rating;
  newInvite.thumbnail = inviteParam.movie.thumbnail;
  newInvite.backdrop = inviteParam.movie.backdrop;
  newInvite.myStatus = 'accepted';
  newInvite.notes = '';
  newInvite.organizer = { id: userId, name: userId };
  newInvite.movie_id = inviteParam.movie.id;
  newInvite.movie = inviteParam.movie;
  newInvite.save(function(err, invite) {
    console.log(JSON.stringify(err));
    if (err) res.status(500).send(err);
    invite['host_id'] = userId;
    sendPushMessage(invite);
    res.json(invite);
  });
};

function sendPushMessage(invite) {
  agSender(settings).then((client) => {
      var message = {alert: 'invite'};
      var alias = [invite.host_id]
      invite.invitees.forEach(function(invitee){alias.push(invitee.id);});
      var options = {
         criteria : {
            alias : alias
         },
         config: {
            ttl: 3600,
          }
      };
      client.sender.send(message, options).then((response) => {
          console.log('success', JSON.stringify(response));
      }).catch(function (error){
        console.log('error sending push', JSON.stringify(error), error);
      });
  });
}


exports.readInvite = function(req, res) {
  Invite.findById(req.params.inviteId, function(err, invite) {
    if (err) res.status(500).send(err);
    res.json(invite);
  });
};

exports.updateInvite = function(req, res) {
  Invite.findOneAndUpdate(
    { _id: req.params.inviteId },
    req.body,
    { new: true },
    function(err, invite) {
      if (err) res.status(500).send(err);
      res.json(invite);
    }
  );
};
