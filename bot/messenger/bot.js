const Eventline = require('eventline');
import send from './messenger-api-helpers/send'

const eventline = new Eventline.Eventline()

// echo all of the user's messages
eventline.on({
    'message.text': /.+/
})
.then(event => {
  console.log('Sending message: ' + event.message.text);

  // Simply echoing the text message back
  return send.sendMessage(event.sender.id, {
      "text": event.message.text,
  }).map(result => {
      return event
  })
})

eventline.start()

module.exports = eventline
