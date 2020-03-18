"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectIsLoadingAsset = void 0;

var _immutable = require("immutable");

var _media = require("../actions/media");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const medias = (state = (0, _immutable.fromJS)({}), action) => {
  switch (action.type) {
    case _media.ADD_ASSETS:
      {
        const payload = action.payload;
        let newState = state;
        payload.forEach(asset => {
          newState = newState.set(asset.path, {
            asset,
            isLoading: false,
            error: null
          });
        });
        return newState;
      }

    case _media.ADD_ASSET:
      {
        const asset = action.payload;
        return state.set(asset.path, {
          asset,
          isLoading: false,
          error: null
        });
      }

    case _media.REMOVE_ASSET:
      {
        const payload = action.payload;
        return state.delete(payload);
      }

    case _media.LOAD_ASSET_REQUEST:
      {
        const {
          path
        } = action.payload;
        return state.set(path, _objectSpread({}, state.get(path), {
          isLoading: true
        }));
      }

    case _media.LOAD_ASSET_SUCCESS:
      {
        const {
          path
        } = action.payload;
        return state.set(path, _objectSpread({}, state.get(path), {
          isLoading: false,
          error: null
        }));
      }

    case _media.LOAD_ASSET_FAILURE:
      {
        const {
          path,
          error
        } = action.payload;
        return state.set(path, _objectSpread({}, state.get(path), {
          isLoading: false,
          error
        }));
      }

    default:
      return state;
  }
};

const selectIsLoadingAsset = state => Object.values(state.toJS()).some(state => state.isLoading);

exports.selectIsLoadingAsset = selectIsLoadingAsset;
var _default = medias;
exports.default = _default;