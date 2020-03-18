"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _auth = require("../actions/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (state = null, action) => {
  switch (action.type) {
    case _auth.AUTH_REQUEST:
      return _immutable.default.Map({
        isFetching: true
      });

    case _auth.AUTH_SUCCESS:
      return _immutable.default.fromJS({
        user: action.payload
      });

    case _auth.AUTH_FAILURE:
      return _immutable.default.Map({
        error: action.payload && action.payload.toString()
      });

    case _auth.AUTH_REQUEST_DONE:
      return state.remove('isFetching');

    case _auth.LOGOUT:
      return state.remove('user').remove('isFetching');

    default:
      return state;
  }
};

var _default = auth;
exports.default = _default;