'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ===== ROUTES ===============================================================
// ===== MODULES ===============================================================
var messengerRoutes = require('../bot/messenger/messenger.route');

//--------------------------------------------------------------------------------
var websiteContent = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Eventline FB Messenger bot</h1>This is a bot leveraging eventline. For more details, see the eventline <a href=\"https://https://github.com/surebot/Eventline/\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";

/** GET /Display the web page */
router.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(websiteContent);
  res.end();
});

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount messenger routes at /messenger
router.use('/messenger', messengerRoutes);

//--------------------------------------------------------------------------------
module.exports = router;