"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectUnpublishedSlugs = exports.selectUnpublishedEntriesByStatus = exports.selectUnpublishedEntry = void 0;

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _immutable = require("immutable");

var _publishModes = require("../constants/publishModes");

var _editorialWorkflow = require("../actions/editorialWorkflow");

var _config = require("../actions/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const unpublishedEntries = (state = (0, _immutable.Map)(), action) => {
  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const publishMode = action.payload && action.payload.get('publish_mode');

        if (publishMode === _publishModes.EDITORIAL_WORKFLOW) {
          //  Editorial workflow state is explicitly initiated after the config.
          return (0, _immutable.Map)({
            entities: (0, _immutable.Map)(),
            pages: (0, _immutable.Map)()
          });
        }

        return state;
      }

    case _editorialWorkflow.UNPUBLISHED_ENTRY_REQUEST:
      return state.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'isFetching'], true);

    case _editorialWorkflow.UNPUBLISHED_ENTRY_REDIRECT:
      return state.deleteIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug)]);

    case _editorialWorkflow.UNPUBLISHED_ENTRY_SUCCESS:
      return state.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.entry.slug)], (0, _immutable.fromJS)(action.payload.entry));

    case _editorialWorkflow.UNPUBLISHED_ENTRIES_REQUEST:
      return state.setIn(['pages', 'isFetching'], true);

    case _editorialWorkflow.UNPUBLISHED_ENTRIES_SUCCESS:
      return state.withMutations(map => {
        action.payload.entries.forEach(entry => map.setIn(['entities', "".concat(entry.collection, ".").concat(entry.slug)], (0, _immutable.fromJS)(entry).set('isFetching', false)));
        map.set('pages', (0, _immutable.Map)(_objectSpread({}, action.payload.pages, {
          ids: (0, _immutable.List)(action.payload.entries.map(entry => entry.slug))
        })));
      });

    case _editorialWorkflow.UNPUBLISHED_ENTRY_PERSIST_REQUEST:
      {
        // Update Optimistically
        return state.withMutations(map => {
          map.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.entry.get('slug'))], (0, _immutable.fromJS)(action.payload.entry));
          map.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.entry.get('slug')), 'isPersisting'], true);
          map.updateIn(['pages', 'ids'], (0, _immutable.List)(), list => list.push(action.payload.entry.get('slug')));
        });
      }

    case _editorialWorkflow.UNPUBLISHED_ENTRY_PERSIST_SUCCESS:
      // Update Optimistically
      return state.deleteIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'isPersisting']);

    case _editorialWorkflow.UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST:
      // Update Optimistically
      return state.withMutations(map => {
        map.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'metaData', 'status'], action.payload.newStatus);
        map.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'isUpdatingStatus'], true);
      });

    case _editorialWorkflow.UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS:
    case _editorialWorkflow.UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE:
      return state.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'isUpdatingStatus'], false);

    case _editorialWorkflow.UNPUBLISHED_ENTRY_PUBLISH_REQUEST:
      return state.setIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug), 'isPublishing'], true);

    case _editorialWorkflow.UNPUBLISHED_ENTRY_PUBLISH_SUCCESS:
    case _editorialWorkflow.UNPUBLISHED_ENTRY_PUBLISH_FAILURE:
      return state.withMutations(map => {
        map.deleteIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug)]);
      });

    case _editorialWorkflow.UNPUBLISHED_ENTRY_DELETE_SUCCESS:
      return state.deleteIn(['entities', "".concat(action.payload.collection, ".").concat(action.payload.slug)]);

    default:
      return state;
  }
};

const selectUnpublishedEntry = (state, collection, slug) => state && state.getIn(['entities', "".concat(collection, ".").concat(slug)]);

exports.selectUnpublishedEntry = selectUnpublishedEntry;

const selectUnpublishedEntriesByStatus = (state, status) => {
  if (!state) return null;
  const entities = state.get('entities');
  return entities.filter(entry => entry.getIn(['metaData', 'status']) === status).valueSeq();
};

exports.selectUnpublishedEntriesByStatus = selectUnpublishedEntriesByStatus;

const selectUnpublishedSlugs = (state, collection) => {
  if (!state.get('entities')) return null;
  const entities = state.get('entities');
  return entities.filter((_v, k) => (0, _startsWith2.default)(k, "".concat(collection, "."))).map(entry => entry.get('slug')).valueSeq();
};

exports.selectUnpublishedSlugs = selectUnpublishedSlugs;
var _default = unpublishedEntries;
exports.default = _default;