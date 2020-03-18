"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _entries = require("../../../actions/entries");

var _reducers = require("../../../reducers");

var _cursors = require("../../../reducers/cursors");

var _Entries = _interopRequireDefault(require("./Entries"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EntriesCollection extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCursorActions", (cursor, action) => {
      const {
        collection,
        traverseCollectionCursor
      } = this.props;
      traverseCollectionCursor(collection, action);
    });
  }

  componentDidMount() {
    const {
      collection,
      entriesLoaded,
      loadEntries
    } = this.props;

    if (collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      collection,
      entriesLoaded,
      loadEntries
    } = this.props;

    if (collection !== prevProps.collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  render() {
    const {
      collection,
      entries,
      isFetching,
      viewStyle,
      cursor
    } = this.props;
    return (0, _core.jsx)(_Entries.default, {
      collections: collection,
      entries: entries,
      isFetching: isFetching,
      collectionName: collection.get('label'),
      viewStyle: viewStyle,
      cursor: cursor,
      handleCursorActions: (0, _partial2.default)(this.handleCursorActions, cursor)
    });
  }

}

_defineProperty(EntriesCollection, "propTypes", {
  collection: _reactImmutableProptypes.default.map.isRequired,
  entries: _reactImmutableProptypes.default.list,
  isFetching: _propTypes.default.bool.isRequired,
  viewStyle: _propTypes.default.string,
  cursor: _propTypes.default.object.isRequired,
  loadEntries: _propTypes.default.func.isRequired,
  traverseCollectionCursor: _propTypes.default.func.isRequired,
  entriesLoaded: _propTypes.default.bool
});

function mapStateToProps(state, ownProps) {
  const {
    collection,
    viewStyle
  } = ownProps;
  const page = state.entries.getIn(['pages', collection.get('name'), 'page']);
  const entries = (0, _reducers.selectEntries)(state, collection.get('name'));
  const entriesLoaded = !!state.entries.getIn(['pages', collection.get('name')]);
  const isFetching = state.entries.getIn(['pages', collection.get('name'), 'isFetching'], false);
  const rawCursor = (0, _cursors.selectCollectionEntriesCursor)(state.cursors, collection.get('name'));

  const cursor = _netlifyCmsLibUtil.Cursor.create(rawCursor).clearData();

  return {
    collection,
    page,
    entries,
    entriesLoaded,
    isFetching,
    viewStyle,
    cursor
  };
}

const mapDispatchToProps = {
  loadEntries: _entries.loadEntries,
  traverseCollectionCursor: _entries.traverseCollectionCursor
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntriesCollection);

exports.default = _default;