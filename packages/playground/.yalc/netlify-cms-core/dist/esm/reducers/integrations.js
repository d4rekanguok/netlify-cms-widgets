"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectIntegration = void 0;

var _immutable = require("immutable");

var _config = require("../actions/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const integrations = (state = null, action) => {
  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const integrations = action.payload.get('integrations', (0, _immutable.List)()).toJS() || [];
        const newState = integrations.reduce((acc, integration) => {
          const {
            hooks,
            collections,
            provider
          } = integration,
                providerData = _objectWithoutProperties(integration, ["hooks", "collections", "provider"]);

          acc.providers[provider] = _objectSpread({}, providerData);

          if (!collections) {
            hooks.forEach(hook => {
              acc.hooks[hook] = provider;
            });
            return acc;
          }

          const integrationCollections = collections === '*' ? action.payload.get('collections').map(collection => collection.get('name')) : collections;
          integrationCollections.forEach(collection => {
            hooks.forEach(hook => {
              acc.hooks[collection] ? acc.hooks[collection][hook] = provider : acc.hooks[collection] = {
                [hook]: provider
              };
            });
          });
          return acc;
        }, {
          providers: {},
          hooks: {}
        });
        return (0, _immutable.fromJS)(newState);
      }

    default:
      return state;
  }
};

const selectIntegration = (state, collection, hook) => collection ? state.getIn(['hooks', collection, hook], false) : state.getIn(['hooks', hook], false);

exports.selectIntegration = selectIntegration;
var _default = integrations;
exports.default = _default;