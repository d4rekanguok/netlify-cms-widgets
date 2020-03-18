"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntilWithTimeout = exports.waitUntil = void 0;

var _waitUntilAction = require("../redux/middleware/waitUntilAction");

const waitUntil = ({
  predicate,
  run
}) => {
  return {
    type: _waitUntilAction.WAIT_UNTIL_ACTION,
    predicate,
    run
  };
};

exports.waitUntil = waitUntil;

const waitUntilWithTimeout = async (dispatch, waitActionArgs, timeout = 30000) => {
  let waitDone = false;
  const waitPromise = new Promise(resolve => {
    dispatch(waitUntil(waitActionArgs(resolve)));
  });
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      if (waitDone) {
        resolve();
      } else {
        console.warn('Wait Action timed out');
        resolve(null);
      }
    }, timeout);
  });
  const result = await Promise.race([waitPromise.then(result => {
    waitDone = true;
    return result;
  }).catch(null), timeoutPromise]);
  return result;
};

exports.waitUntilWithTimeout = waitUntilWithTimeout;