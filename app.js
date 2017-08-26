
// ===== MODULES ===============================================================
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';

// ===== MESSENGER =============================================================
// import ThreadSetup from './bot/messenger/messenger-api-helpers/thread-setup';

// ===== INDEX ROUTE ================================================================
const routes = require('./routes/index.route'); //The endpoints


const app = express();

/* =============================================
   =           Basic Configuration             =
   ============================================= */


/* ----------  Parsers  ---------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

 /* ----------  Loggers &c  ---------- */

app.use(logger('dev'));

/* =============================================
   =                   Routes                  =
   ============================================= */

/* ----------  Primary / Happy Path  ---------- */

// mount all routes on / path
app.use('/', routes);

/* ----------  Errors  ---------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});

/* ----------  Messenger setup  ---------- */

// ThreadSetup.setGetStarted();
// ThreadSetup.setPersistentMenu();
// ThreadSetup.setGreetingText();


module.exports = app; // eslint-disable-line
