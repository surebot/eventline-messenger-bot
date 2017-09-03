'use strict';

var _eventline = require('eventline');

var _send = require('./messenger-api-helpers/send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventline = new _eventline.Eventline();

// echo all of the user's messages
eventline.on({
    'message.text': /.+/
}).then(function (event) {
    // Simply echoing the text message back
    return _send2.default.sendMessage(event.sender.id, {
        "text": event.message.text
    });
});

eventline.start();

module.exports = eventline;