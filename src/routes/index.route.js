// ===== MODULES ===============================================================
import express from 'express';
const router = express.Router();

// ===== ROUTES ===============================================================
const messengerRoutes = require('../bot/messenger/messenger.route');

//--------------------------------------------------------------------------------
var websiteContent = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Eventline FB Messenger bot</h1>This is a bot leveraging eventline. For more details, see the eventline <a href=\"https://https://github.com/surebot/Eventline/\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";

/** GET /Display the web page */
router.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(websiteContent);
  res.end();
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount messenger routes at /messenger
router.use('/messenger', messengerRoutes);

//--------------------------------------------------------------------------------
module.exports = router;
