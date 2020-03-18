"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectDeployPreview = void 0;

var _immutable = require("immutable");

var _deploys = require("../actions/deploys");

const deploys = (state = (0, _immutable.Map)({
  deploys: (0, _immutable.Map)()
}), action) => {
  switch (action.type) {
    case _deploys.DEPLOY_PREVIEW_REQUEST:
      {
        const {
          collection,
          slug
        } = action.payload;
        return state.setIn(['deploys', "".concat(collection, ".").concat(slug), 'isFetching'], true);
      }

    case _deploys.DEPLOY_PREVIEW_SUCCESS:
      {
        const {
          collection,
          slug,
          url,
          status
        } = action.payload;
        return state.setIn(['deploys', "".concat(collection, ".").concat(slug)], (0, _immutable.fromJS)({
          isFetching: false,
          url,
          status
        }));
      }

    case _deploys.DEPLOY_PREVIEW_FAILURE:
      {
        const {
          collection,
          slug
        } = action.payload;
        return state.setIn(['deploys', "".concat(collection, ".").concat(slug)], (0, _immutable.fromJS)({
          isFetching: false
        }));
      }

    default:
      return state;
  }
};

const selectDeployPreview = (state, collection, slug) => state.getIn(['deploys', "".concat(collection, ".").concat(slug)]);

exports.selectDeployPreview = selectDeployPreview;
var _default = deploys;
exports.default = _default;