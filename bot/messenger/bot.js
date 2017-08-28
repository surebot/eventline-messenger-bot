import { Eventline } from 'eventline'
import send from './messenger-api-helpers/send'

const eventline = new Eventline()

// echo all of the user's messages
eventline.on({
    'message.text': /.+/
})
.then(event => {
  // Simply echoing the text message back
  return send.sendMessage(event.sender.id, {
      "text": event.message.text,
  }).map(result => {
      return event
  })
})

eventline.start()

module.exports = eventline
