"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _auth = require("../actions/auth");

const LOADING_IGNORE_LIST = ['DEPLOY_PREVIEW'];

const ignoreWhenLoading = action => LOADING_IGNORE_LIST.some(type => action.type.includes(type));
/*
 * Reducer for some global UI state that we want to share between components
 * */


const globalUI = (state = (0, _immutable.Map)({
  isFetching: false,
  useOpenAuthoring: false
}), action) => {
  // Generic, global loading indicator
  if (!ignoreWhenLoading(action) && action.type.includes('REQUEST')) {
    return state.set('isFetching', true);
  } else if (!ignoreWhenLoading(action) && (action.type.includes('SUCCESS') || action.type.includes('FAILURE'))) {
    return state.set('isFetching', false);
  } else if (action.type === _auth.USE_OPEN_AUTHORING) {
    return state.set('useOpenAuthoring', true);
  }

  return state;
};

var _default = globalUI;
exports.default = _default;