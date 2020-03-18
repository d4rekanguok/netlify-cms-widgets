"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectUseWorkflow = exports.selectLocale = void 0;

var _immutable = require("immutable");

var _config = require("../actions/config");

var _publishModes = require("../constants/publishModes");

const defaultState = (0, _immutable.Map)({
  isFetching: true
});

const config = (state = defaultState, action) => {
  switch (action.type) {
    case _config.CONFIG_MERGE:
      return state.mergeDeep(action.payload);

    case _config.CONFIG_REQUEST:
      return state.set('isFetching', true);

    case _config.CONFIG_SUCCESS:
      /**
       * The loadConfig action merges any existing config into the loaded config
       * before firing this action (so the resulting config can be validated),
       * so we don't have to merge it here.
       */
      return action.payload.delete('isFetching');

    case _config.CONFIG_FAILURE:
      return state.withMutations(s => {
        s.delete('isFetching');
        s.set('error', action.payload.toString());
      });

    default:
      return state;
  }
};

const selectLocale = state => state.get('locale', 'en');

exports.selectLocale = selectLocale;

const selectUseWorkflow = state => state.get('publish_mode') === _publishModes.EDITORIAL_WORKFLOW;

exports.selectUseWorkflow = selectUseWorkflow;
var _default = config;
exports.default = _default;