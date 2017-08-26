// ===== MODULES ===============================================================
import express from 'express';

// ===== MESSENGER =============================================================
import receiveApi from './messenger-api-helpers/receive';

const router = express.Router();

/**
 * This is used so that Facebook can verify that they have
 * the correct Webhook location for your app.
 *
 * The Webhook token must be set in your app's configuration page
 * as well as in your servers environment.
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {

  // dashbot.logIncoming(req.body);

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

  const data = req.body;

  //dashbot.logIncoming(data);

  // Make sure this is a page subscription
  switch(data.object) {
    case 'page':
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach((pageEntry) => {
        // Iterate over each messaging event and handle accordingly
        pageEntry.messaging.forEach((messagingEvent) => {
          console.log({messagingEvent});
          receiveApi.handleReceiveMessage(messagingEvent);
        });
      });
      break

    case 'notification':
      receiveApi.handleReceiveMessage(data.payload);
      break;
  }
});

module.exports = router;