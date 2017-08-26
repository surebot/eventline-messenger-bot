const Eventline = require('eventline');

// ===== COMPONENTS ============================================================
// const ReadReceipt = require('./component/read-receipt')
// const FetchMessengerProfile = require('./component/fetch-messenger-profile')
// const GettingStarted = require('./component/getting-started')
// const PersistentMenu = require('./component/persistent-menu')
// const Notifications = require('./component/notifications')

const eventline = new Eventline.Eventline()


// ===== USE Components ========================================================
//eventline.use(ReadReceipt) - TODO: Why does this module break things
// eventline.use(PersistentMenu)
// eventline.use(FetchMessengerProfile)
eventline.use(GettingStarted)

// echo all of the user's messages
eventline.on([
    {
        'message.text': /.+/
    }
])
.then(event => {
    console.log(event)
    console.log("=======")
    return event
})
// .then(event => {
//   messenger.send(event.sender.id, {
//       text: event.message.text
//   })
// })

eventline.start()

module.exports = eventline
