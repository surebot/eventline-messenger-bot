'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ===== MODULES ===============================================================
var router = _express2.default.Router();

/**
 * This is used so that Facebook can verify that they have
 * the correct Webhook location for your app.
 *
 * The Webhook token must be set in your app's configuration page
 * as well as in your servers environment.
 */


// ===== MESSENGER =============================================================
router.get('/', function (req, res) {
  if (req.query['hub.verify_token'] === process.env.WEBHOOK_TOKEN || "token") {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token ');
  }
});

/**
 * Once your Webhook is verified this is where you will receive
 * all interactions from the users of you Messenger Application.
 *
 * You can subscribe to many different types of messages.
 * However for this demo we've only handled what is necessary:
 * 1. Regular messages
 * 2. Postbacks
 */
router.post('/', function (req, res) {

  /*
    You must send back a status of 200(success) within 20 seconds
    to let us know you've successfully received the callback.
    Otherwise, the request will time out.
     When a request times out from Facebook the service attempts
    to resend the message.
     This is why it is good to send a response immediately so you
    don't get duplicate messages in the event that a request takes
    awhile to process.
  */
  res.sendStatus(200);

  var data = req.body;

  // Make sure this is a page subscription
  switch (data.object) {
    case 'page':
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach(function (pageEntry) {
        // Iterate over each messaging event and handle accordingly
        pageEntry.messaging.forEach(function (messagingEvent) {
          _bot2.default.route(messagingEvent);
        });
      });
      break;

    case 'notification':
      _bot2.default.route(data.payload);
      break;
  }
});

module.exports = router;