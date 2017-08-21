import Eventline from 'eventline'
import send from '../../messenger-api-helpers/send';

// ===== COMPONENTS ============================================================
const eventline = new Eventline.Eventline()


// ===== Simple echo bot =======================================================
eventline.on([
    {
        'message.text': /.+/
    }
])

.then(event => {
    console.log(event)
    return event
})
.then(event => {
    console.log("=======")
    return event
})
.then(event => {
    return send.sendMessage(context.sender.id,
    [
      {
        "text": event.message.text,
      }
    ]).map(result => {
        return context
    })
})


eventline.start()
