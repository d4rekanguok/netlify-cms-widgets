"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectCollectionEntriesCursor = void 0;

var _immutable = require("immutable");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _entries = require("../actions/entries");

// Since pagination can be used for a variety of views (collections
// and searches are the most common examples), we namespace cursors by
// their type before storing them in the state.
const selectCollectionEntriesCursor = (state, collectionName) => new _netlifyCmsLibUtil.Cursor(state.getIn(['cursorsByType', 'collectionEntries', collectionName]));

exports.selectCollectionEntriesCursor = selectCollectionEntriesCursor;

const cursors = (state = (0, _immutable.fromJS)({
  cursorsByType: {
    collectionEntries: {}
  }
}), action) => {
  switch (action.type) {
    case _entries.ENTRIES_SUCCESS:
      {
        return state.setIn(['cursorsByType', 'collectionEntries', action.payload.collection], _netlifyCmsLibUtil.Cursor.create(action.payload.cursor).store);
      }

    default:
      return state;
  }
};

var _default = cursors;
exports.default = _default;