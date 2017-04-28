'use strict';

var mongoose = require('mongoose'), Invite = require('../models/inviteModel');

exports.listUserInvites = function(req, res) {
  //TODO: get userId from authentication data
  var userId = 'test-user-id';
  Invite.find({ host_id: userId }, function(err, invites) {
    console.log(JSON.stringify(invites));
    if (err) res.status(500).send(err);
    res.json(invites);
  });
};

exports.createInvite = function(req, res) {
  //TODO: get userId from authentication data
  var userId = 'test-user-id';
  req.body.host_id = userId;
  var newInvite = new Invite(req.body);
  newInvite.save(function(err, invite) {
    if (err) res.status(500).send(err);
    invite['host_id'] = userId;
    res.json(invite);
  });
};

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
