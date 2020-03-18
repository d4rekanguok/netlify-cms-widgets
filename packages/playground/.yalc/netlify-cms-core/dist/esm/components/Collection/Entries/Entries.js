"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _EntryListing = _interopRequireDefault(require("./EntryListing"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Entries = ({
  collections,
  entries,
  isFetching,
  viewStyle,
  cursor,
  handleCursorActions,
  t
}) => {
  const loadingMessages = [t('collection.entries.loadingEntries'), t('collection.entries.cachingEntries'), t('collection.entries.longerLoading')];

  if (entries) {
    return (0, _core.jsx)(_EntryListing.default, {
      collections: collections,
      entries: entries,
      viewStyle: viewStyle,
      cursor: cursor,
      handleCursorActions: handleCursorActions
    });
  }

  if (isFetching) {
    return (0, _core.jsx)(_netlifyCmsUiDefault.Loader, {
      active: true
    }, loadingMessages);
  }

  return (0, _core.jsx)("div", {
    className: "nc-collectionPage-noEntries"
  }, "No Entries");
};

Entries.propTypes = {
  collections: _reactImmutableProptypes.default.map.isRequired,
  entries: _reactImmutableProptypes.default.list,
  page: _propTypes.default.number,
  isFetching: _propTypes.default.bool,
  viewStyle: _propTypes.default.string,
  cursor: _propTypes.default.any.isRequired,
  handleCursorActions: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};

var _default = (0, _reactPolyglot.translate)()(Entries);

exports.default = _default;