/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== MESSENGER =============================================================
import api from './api';
import constants from '../constants';

/*
 * SETUP
 *
 * Methods that should only be called at first run
 * that help set up Messenger related config
 */

const SERVER_URL = process.env.SERVER_URL || "https://sure-messenger.herokuapp.com/";


/* ----------  Functions  ---------- */


/**
 * Sets the Persistent Menu for the application
 */
const setPersistentMenu = () => {
  api.callMessengerProfileAPI({
    "persistent_menu":[
      {
        "locale":"default",
        "call_to_actions":[
          {
            "type": "postback",
            "title": "Trending right now 🔥",
            "payload": constants.SEARCH_POSTBACK
          },
          // {
          //   "type": "web_url",
          //   "title": "Nearby places",
          //   "url": SERVER_URL,
          //   "webview_height_ratio": "full"
          // },
          // {
          //   "type":"postback",
          //   "title":"Home",
          //   "payload": constants.SEARCH_POSTBACK
          // },
          // {
          //   "title": "More",
          //   "type": "nested",
          //   "call_to_actions":[
          //     {
          //       "title":"Home",
          //       "type":"postback",
          //       "payload":constants.HOME
          //     },
          //     {
          //       "title":"History",
          //       "type":"postback",
          //       "payload":"HISTORY_PAYLOAD"
          //     },
          //     {
          //       "title":"Contact Info",
          //       "type":"postback",
          //       "payload":"CONTACT_INFO_PAYLOAD"
          //     }
          //   ]
          // },
        ]
      }
    ]
  }).subscribe();
};

/**
 * Sets the Greeting text for the application
 */
const setGetStarted = () => {
  api.callMessengerProfileAPI({
    get_started: {
      payload: constants.GET_STARTED_POSTBACK
    }
  }).subscribe();
};

/**
 * Sets the Greeting test for the application
 */
const setGreetingText = () => {
  api.callMessengerProfileAPI({
    greeting:[
      {
        locale: "default",
        text: "Bot that curates the most Instagrammed food & drink spots 🍕🍔🥑"
      }
      // {
      //   locale:"en_US",
      //   "text":"Timeless apparel for the masses."
      // }
    ]
  }).subscribe();
};


export default {
  setGetStarted,
  setPersistentMenu,
  setGreetingText
};
