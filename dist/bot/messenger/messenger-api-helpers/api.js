'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _castArray3 = require('lodash/castArray');

var _castArray4 = _interopRequireDefault(_castArray3);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } /**
                                                                               * Copyright 2017-present, Facebook, Inc. All rights reserved.
                                                                               *
                                                                               * This source code is licensed under the license found in the
                                                                               * LICENSE file in the root directory of this source tree.
                                                                               */

// ===== LODASH ================================================================


// ===== MODULES ===============================================================


var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAW6DM0210ABALjMT1ljDm3SsMoq1lWNlbAMR8S24U8G5ZBBYVMHEWBkXZCyJqgeG0mWK41WGa80uqZBFjDub4OUFNUj5gQgwbrZAfygrZBnQwZBbia3m7Jy1LnOLjShIt1vU7Mm9ok6ZBHMEDqXiYIszvOGbl4wMZBWqHU1ZAuKj0QZDZD"; // text a hipster

/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {Object|Object[]} messageDataArray - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
var callAPI = function callAPI(endPoint, messageDataArray) {
  var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    return _Rx2.default.Observable.empty();
  }

  // Error if we've run out of retries.
  if (retries < 0) {
    console.error('No more retries left.');
    return _Rx2.default.Observable.empty();
  }

  // ensure query parameters have a PAGE_ACCESS_TOKEN value
  /* eslint-disable camelcase */
  var query = Object.assign({ access_token: PAGE_ACCESS_TOKEN }, queryParams);
  /* eslint-enable camelcase */

  // ready the first message in the array for send.

  var _castArray = (0, _castArray4.default)(messageDataArray),
      _castArray2 = _toArray(_castArray),
      messageToSend = _castArray2[0],
      queue = _castArray2.slice(1);

  return _Rx2.default.Observable.create(function (observer) {

    console.log('Sending ' + JSON.stringify(messageToSend));

    (0, _request2.default)({
      uri: 'https://graph.facebook.com/v2.6/me/' + endPoint,
      qs: query,
      method: 'POST',
      json: messageToSend
    }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        observer.next(body);
        observer.complete();
      } else {
        observer.error(error);
      }
    });
  }).flatMap(function (body) {

    if (!(0, _isEmpty2.default)(queue)) {
      return callAPI(endPoint, queue, queryParams);
    }

    return _Rx2.default.Observable.just(body);
  }).catch(function (error) {
    return callAPI(endPoint, messageDataArray, queryParams, retries - 1);
  });
};

var callMessagesAPI = function callMessagesAPI(messageDataArray) {
  var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return callAPI('messages', messageDataArray, queryParams);
};

var callThreadAPI = function callThreadAPI(messageDataArray) {
  var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return callAPI('thread_settings', messageDataArray, queryParams);
};

var callMessengerProfileAPI = function callMessengerProfileAPI(messageDataArray) {
  var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return callAPI('messenger_profile', messageDataArray, queryParams);
};

var fetchProfileAPI = function fetchProfileAPI(senderID) {

  var request = require("request");

  var options = { method: 'GET',
    url: 'https://graph.facebook.com/v2.6/' + senderID,
    qs: {
      fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
      access_token: PAGE_ACCESS_TOKEN
    },
    json: true
  };

  return _Rx2.default.Observable.create(function (observer) {

    request(options, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        observer.next(body);
        observer.completed();
      } else {
        observer.error(error);
      }
    });
  });
};

exports.default = {
  callMessagesAPI: callMessagesAPI,
  callMessengerProfileAPI: callMessengerProfileAPI,
  callThreadAPI: callThreadAPI,
  fetchProfileAPI: fetchProfileAPI
};