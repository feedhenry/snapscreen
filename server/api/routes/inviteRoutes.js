'use strict';

module.exports = function(app) {
  var invite = require('../controllers/inviteController');

  app.route('/invites').get(invite.listUserInvites).post(invite.createInvite);

  app
    .route('/invites/:inviteId')
    .get(invite.readInvite)
    .patch(invite.updateInvite);
};
