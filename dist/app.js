'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ===== INDEX ROUTE ================================================================
var routes = require('./routes/index.route'); //The endpoints

// ===== MODULES ===============================================================
var app = (0, _express2.default)();

/* =============================================
   =           Basic Configuration             =
   ============================================= */

/* ----------  Parsers  ---------- */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

/* ----------  Loggers &c  ---------- */

app.use((0, _morgan2.default)('dev'));

/* =============================================
   =                   Routes                  =
   ============================================= */

/* ----------  Primary / Happy Path  ---------- */

// mount all routes on / path
app.use('/', routes);

/* ----------  Errors  ---------- */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
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

module.exports = app; // eslint-disable-line