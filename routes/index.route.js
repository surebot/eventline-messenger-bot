// ===== MODULES ===============================================================
import express from 'express';
const router = express.Router();

// ===== ROUTES ===============================================================
const messengerRoutes = require('../bot/messenger/messenger.route');

//--------------------------------------------------------------------------------

/** GET /health-check - Check service health */
router.get('', (req, res) =>
  res.send('Chatbot up and running')
);

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount messenger routes at /messenger
router.use('/messenger', messengerRoutes);

//--------------------------------------------------------------------------------
module.exports = router;
