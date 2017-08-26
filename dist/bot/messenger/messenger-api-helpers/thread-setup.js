'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * SETUP
 *
 * Methods that should only be called at first run
 * that help set up Messenger related config
 */

/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MESSENGER =============================================================
var SERVER_URL = process.env.SERVER_URL || "https://sure-messenger.herokuapp.com/";

/* ----------  Functions  ---------- */

/**
 * Sets the Persistent Menu for the application
 */
var setPersistentMenu = function setPersistentMenu() {
  _api2.default.callMessengerProfileAPI({
    "persistent_menu": [{
      "locale": "default",
      "call_to_actions": [{
        "type": "postback",
        "title": "Trending right now 🔥",
        "payload": _constants2.default.SEARCH_POSTBACK
      }]
    }]
  }).subscribe();
};

/**
 * Sets the Greeting text for the application
 */
var setGetStarted = function setGetStarted() {
  _api2.default.callMessengerProfileAPI({
    get_started: {
      payload: _constants2.default.GET_STARTED_POSTBACK
    }
  }).subscribe();
};

/**
 * Sets the Greeting test for the application
 */
var setGreetingText = function setGreetingText() {
  _api2.default.callMessengerProfileAPI({
    greeting: [{
      locale: "default",
      text: "Bot that curates the most Instagrammed food & drink spots 🍕🍔🥑"
      // {
      //   locale:"en_US",
      //   "text":"Timeless apparel for the masses."
      // }
    }]
  }).subscribe();
};

exports.default = {
  setGetStarted: setGetStarted,
  setPersistentMenu: setPersistentMenu,
  setGreetingText: setGreetingText
};