"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _search = require("../actions/search");

let loadedEntries;
let response;
let page;
let searchTerm;
const defaultState = (0, _immutable.Map)({
  isFetching: false,
  term: null,
  page: 0,
  entryIds: (0, _immutable.List)([]),
  queryHits: (0, _immutable.Map)({})
});

const entries = (state = defaultState, action) => {
  switch (action.type) {
    case _search.SEARCH_CLEAR:
      return defaultState;

    case _search.SEARCH_ENTRIES_REQUEST:
      if (action.payload.searchTerm !== state.get('term')) {
        return state.withMutations(map => {
          map.set('isFetching', true);
          map.set('term', action.payload.searchTerm);
        });
      }

      return state;

    case _search.SEARCH_ENTRIES_SUCCESS:
      loadedEntries = action.payload.entries;
      page = action.payload.page;
      searchTerm = action.payload.searchTerm;
      return state.withMutations(map => {
        const entryIds = (0, _immutable.List)(loadedEntries.map(entry => ({
          collection: entry.collection,
          slug: entry.slug
        })));
        map.set('isFetching', false);
        map.set('fetchID', null);
        map.set('page', page);
        map.set('term', searchTerm);
        map.set('entryIds', !page || isNaN(page) || page === 0 ? entryIds : map.get('entryIds', (0, _immutable.List)()).concat(entryIds));
      });

    case _search.QUERY_REQUEST:
      if (action.payload.searchTerm !== state.get('term')) {
        return state.withMutations(map => {
          map.set('isFetching', action.payload.namespace ? true : false);
          map.set('fetchID', action.payload.namespace);
          map.set('term', action.payload.searchTerm);
        });
      }

      return state;

    case _search.QUERY_SUCCESS:
      searchTerm = action.payload.searchTerm;
      response = action.payload.response;
      return state.withMutations(map => {
        map.set('isFetching', false);
        map.set('fetchID', null);
        map.set('term', searchTerm);
        map.mergeIn(['queryHits'], (0, _immutable.Map)({
          [action.payload.namespace]: response.hits
        }));
      });

    default:
      return state;
  }
};

var _default = entries;
exports.default = _default;