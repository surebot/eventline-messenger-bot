'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ===== ROUTES ===============================================================
// ===== MODULES ===============================================================
var messengerRoutes = require('../bot/messenger/messenger.route');

//--------------------------------------------------------------------------------

/** GET /health-check - Check service health */
router.get('', function (req, res) {
  return res.send('chatbot up and running');
});

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount messenger routes at /messenger
router.use('/messenger', messengerRoutes);

//--------------------------------------------------------------------------------
module.exports = router;