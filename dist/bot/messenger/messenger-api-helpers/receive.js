'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _send = require('./send');

var _send2 = _interopRequireDefault(_send);

var _bot = require('../bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MODULES ===============================================================
var handleReceiveMessage = function handleReceiveMessage(event) {
  _bot2.default.route(event);
};

exports.default = {
  handleReceiveMessage: handleReceiveMessage
};