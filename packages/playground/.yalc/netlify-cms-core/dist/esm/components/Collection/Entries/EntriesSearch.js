"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _reducers = require("../../../reducers");

var _search = require("../../../actions/search");

var _Entries = _interopRequireDefault(require("./Entries"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EntriesSearch extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getCursor", () => {
      const {
        page
      } = this.props;
      return _netlifyCmsLibUtil.Cursor.create({
        actions: isNaN(page) ? [] : ['append_next']
      });
    });

    _defineProperty(this, "handleCursorActions", action => {
      const {
        page,
        searchTerm,
        searchEntries
      } = this.props;

      if (action === 'append_next') {
        const nextPage = page + 1;
        searchEntries(searchTerm, nextPage);
      }
    });
  }

  componentDidMount() {
    const {
      searchTerm,
      searchEntries
    } = this.props;
    searchEntries(searchTerm);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm === this.props.searchTerm) return;
    const {
      searchEntries
    } = prevProps;
    searchEntries(this.props.searchTerm);
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  render() {
    const {
      collections,
      entries,
      isFetching
    } = this.props;
    return (0, _core.jsx)(_Entries.default, {
      cursor: this.getCursor(),
      handleCursorActions: this.handleCursorActions,
      collections: collections,
      entries: entries,
      isFetching: isFetching
    });
  }

}

_defineProperty(EntriesSearch, "propTypes", {
  isFetching: _propTypes.default.bool,
  searchEntries: _propTypes.default.func.isRequired,
  clearSearch: _propTypes.default.func.isRequired,
  searchTerm: _propTypes.default.string.isRequired,
  collections: _reactImmutableProptypes.default.seq,
  entries: _reactImmutableProptypes.default.list,
  page: _propTypes.default.number
});

function mapStateToProps(state, ownProps) {
  const {
    searchTerm
  } = ownProps;
  const collections = ownProps.collections.toIndexedSeq();
  const isFetching = state.search.get('isFetching');
  const page = state.search.get('page');
  const entries = (0, _reducers.selectSearchedEntries)(state);
  return {
    isFetching,
    page,
    collections,
    entries,
    searchTerm
  };
}

const mapDispatchToProps = {
  searchEntries: _search.searchEntries,
  clearSearch: _search.clearSearch
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntriesSearch);

exports.default = _default;