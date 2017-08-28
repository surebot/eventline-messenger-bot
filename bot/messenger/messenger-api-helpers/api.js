/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== LODASH ================================================================
import castArray from 'lodash/castArray';
import isEmpty from 'lodash/isEmpty';

// ===== MODULES ===============================================================
import request from 'request';
import Rx from 'rxjs/Rx';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAW6DM0210ABALjMT1ljDm3SsMoq1lWNlbAMR8S24U8G5ZBBYVMHEWBkXZCyJqgeG0mWK41WGa80uqZBFjDub4OUFNUj5gQgwbrZAfygrZBnQwZBbia3m7Jy1LnOLjShIt1vU7Mm9ok6ZBHMEDqXiYIszvOGbl4wMZBWqHU1ZAuKj0QZDZD" // text a hipster

/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {Object|Object[]} messageDataArray - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    return Rx.Observable.empty();
  }

  // Error if we've run out of retries.
  if (retries < 0) {
    console.error('No more retries left.');
    return Rx.Observable.empty();
  }

  // ensure query parameters have a PAGE_ACCESS_TOKEN value
  /* eslint-disable camelcase */
  const query = Object.assign({access_token: PAGE_ACCESS_TOKEN}, queryParams);
  /* eslint-enable camelcase */

  // ready the first message in the array for send.
  const [messageToSend, ...queue] = castArray(messageDataArray);

  return Rx.Observable.create(function (observer) {

    console.log('Sending ' + JSON.stringify(messageToSend))

     request({
      uri: `https://graph.facebook.com/v2.6/me/${endPoint}`,
      qs: query,
      method: 'POST',
      json: messageToSend
    }, (error, response, body) => {

      if (!error && response.statusCode === 200) {
        observer.next(body)
        observer.complete()
      } else {
        observer.error(error)
      }
    })
    
  }).flatMap(body => {

    if (!isEmpty(queue)) {
      return callAPI(endPoint, queue, queryParams);
    }

    return Rx.Observable.just(body)

  }).catch( error => {
    return callAPI(endPoint, messageDataArray, queryParams, retries - 1)
  })
};

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('messages', messageDataArray, queryParams);
};

const callThreadAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('thread_settings', messageDataArray, queryParams);
};

const callMessengerProfileAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('messenger_profile', messageDataArray, queryParams);
};

const fetchProfileAPI = (senderID) => {

  var request = require("request");

  var options = { method: 'GET',
    url: 'https://graph.facebook.com/v2.6/' + senderID,
    qs: {
      fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
      access_token: PAGE_ACCESS_TOKEN
    },
    json: true
  };

  return Rx.Observable.create(function (observer) {

     request(options, (error, response, body) => {

      if (!error && response.statusCode === 200) {
        observer.next(body)
        observer.completed()
      } else {
        observer.error(error)
      }
    })
  })
};

export default {
  callMessagesAPI,
  callMessengerProfileAPI,
  callThreadAPI,
  fetchProfileAPI
};
