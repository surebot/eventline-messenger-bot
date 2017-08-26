'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _castArray = require('lodash/castArray');

var _castArray2 = _interopRequireDefault(_castArray);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Copyright 2017-present, Facebook, Inc. All rights reserved.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * This source code is licensed under the license found in the
                                                                                                                                                                                                     * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                     */

// ===== LODASH ================================================================


// ===== MESSENGER =============================================================


// Turns typing indicator on.
var typingOn = function typingOn(recipientId) {
  return {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on' // eslint-disable-line camelcase
  };
};

// Turns typing indicator off.
var typingOff = function typingOff(recipientId) {
  return {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_off' // eslint-disable-line camelcase
  };
};

// Wraps a message JSON object with recipient information.
var messageToJSON = function messageToJSON(recipientId, messagePayload) {
  return {
    recipient: {
      id: recipientId
    },
    message: messagePayload
  };
};

// Send one or more messages using the Send API.
var sendMessage = function sendMessage(recipientId, messagePayloads) {
  var messagePayloadArray = (0, _castArray2.default)(messagePayloads).map(function (messagePayload) {
    return messageToJSON(recipientId, messagePayload);
  });

  console.log('Sending ' + messagePayloadArray + ' to ' + recipientId);

  return _api2.default.callMessagesAPI([typingOn(recipientId)].concat(_toConsumableArray(messagePayloadArray), [typingOff(recipientId)]));
};

// Send a read receipt to indicate the message has been read
var sendReadReceipt = function sendReadReceipt(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen' // eslint-disable-line camelcase
  };

  return _api2.default.callMessagesAPI(messageData);
};

exports.default = {
  sendMessage: sendMessage,
  sendReadReceipt: sendReadReceipt
};