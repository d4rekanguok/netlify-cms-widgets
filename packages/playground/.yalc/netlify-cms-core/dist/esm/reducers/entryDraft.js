"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _v = _interopRequireDefault(require("uuid/v4"));

var _entries = require("../actions/entries");

var _editorialWorkflow = require("../actions/editorialWorkflow");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = (0, _immutable.Map)({
  entry: (0, _immutable.Map)(),
  fieldsMetaData: (0, _immutable.Map)(),
  fieldsErrors: (0, _immutable.Map)(),
  hasChanged: false,
  key: ''
});

const entryDraftReducer = (state = (0, _immutable.Map)(), action) => {
  switch (action.type) {
    case _entries.DRAFT_CREATE_FROM_ENTRY:
      // Existing Entry
      return state.withMutations(state => {
        state.set('entry', (0, _immutable.fromJS)(action.payload.entry));
        state.setIn(['entry', 'newRecord'], false);
        state.set('fieldsMetaData', (0, _immutable.Map)());
        state.set('fieldsErrors', (0, _immutable.Map)());
        state.set('hasChanged', false);
        state.set('key', (0, _v.default)());
      });

    case _entries.DRAFT_CREATE_EMPTY:
      // New Entry
      return state.withMutations(state => {
        state.set('entry', (0, _immutable.fromJS)(action.payload));
        state.setIn(['entry', 'newRecord'], true);
        state.set('fieldsMetaData', (0, _immutable.Map)());
        state.set('fieldsErrors', (0, _immutable.Map)());
        state.set('hasChanged', false);
        state.set('key', (0, _v.default)());
      });

    case _entries.DRAFT_CREATE_FROM_LOCAL_BACKUP:
      // Local Backup
      return state.withMutations(state => {
        const backupDraftEntry = state.get('localBackup');
        const backupEntry = backupDraftEntry.get('entry');
        state.delete('localBackup');
        state.set('entry', backupEntry);
        state.setIn(['entry', 'newRecord'], !backupEntry.get('path'));
        state.set('fieldsMetaData', (0, _immutable.Map)());
        state.set('fieldsErrors', (0, _immutable.Map)());
        state.set('hasChanged', true);
        state.set('key', (0, _v.default)());
      });

    case _entries.DRAFT_CREATE_DUPLICATE_FROM_ENTRY:
      // Duplicate Entry
      return state.withMutations(state => {
        state.set('entry', (0, _immutable.fromJS)(action.payload));
        state.setIn(['entry', 'newRecord'], true);
        state.set('mediaFiles', (0, _immutable.List)());
        state.set('fieldsMetaData', (0, _immutable.Map)());
        state.set('fieldsErrors', (0, _immutable.Map)());
        state.set('hasChanged', true);
      });

    case _entries.DRAFT_DISCARD:
      return initialState;

    case _entries.DRAFT_LOCAL_BACKUP_RETRIEVED:
      {
        const {
          entry
        } = action.payload;
        const newState = new _immutable.Map({
          entry: (0, _immutable.fromJS)(entry)
        });
        return state.set('localBackup', newState);
      }

    case _entries.DRAFT_CHANGE_FIELD:
      {
        return state.withMutations(state => {
          state.setIn(['entry', 'data', action.payload.field], action.payload.value);
          state.mergeDeepIn(['fieldsMetaData'], (0, _immutable.fromJS)(action.payload.metadata));
          const newData = state.getIn(['entry', 'data']);
          state.set('hasChanged', !action.payload.entries.some(e => newData.equals(e.get('data'))));
        });
      }

    case _entries.DRAFT_VALIDATION_ERRORS:
      if (action.payload.errors.length === 0) {
        return state.deleteIn(['fieldsErrors', action.payload.uniquefieldId]);
      } else {
        return state.setIn(['fieldsErrors', action.payload.uniquefieldId], action.payload.errors);
      }

    case _entries.DRAFT_CLEAR_ERRORS:
      {
        return state.set('fieldsErrors', (0, _immutable.Map)());
      }

    case _entries.ENTRY_PERSIST_REQUEST:
    case _editorialWorkflow.UNPUBLISHED_ENTRY_PERSIST_REQUEST:
      {
        return state.setIn(['entry', 'isPersisting'], true);
      }

    case _entries.ENTRY_PERSIST_FAILURE:
    case _editorialWorkflow.UNPUBLISHED_ENTRY_PERSIST_FAILURE:
      {
        return state.deleteIn(['entry', 'isPersisting']);
      }

    case _entries.ENTRY_PERSIST_SUCCESS:
    case _editorialWorkflow.UNPUBLISHED_ENTRY_PERSIST_SUCCESS:
      return state.withMutations(state => {
        state.deleteIn(['entry', 'isPersisting']);
        state.set('hasChanged', false);

        if (!state.getIn(['entry', 'slug'])) {
          state.setIn(['entry', 'slug'], action.payload.slug);
        }
      });

    case _entries.ENTRY_DELETE_SUCCESS:
      return state.withMutations(state => {
        state.deleteIn(['entry', 'isPersisting']);
        state.set('hasChanged', false);
      });

    case _entries.ADD_DRAFT_ENTRY_MEDIA_FILE:
      {
        return state.withMutations(state => {
          const mediaFiles = state.getIn(['entry', 'mediaFiles']);
          state.setIn(['entry', 'mediaFiles'], mediaFiles.filterNot(file => file.get('id') === action.payload.id).insert(0, (0, _immutable.fromJS)(action.payload)));
          state.set('hasChanged', true);
        });
      }

    case _entries.REMOVE_DRAFT_ENTRY_MEDIA_FILE:
      {
        return state.withMutations(state => {
          const mediaFiles = state.getIn(['entry', 'mediaFiles']);
          state.setIn(['entry', 'mediaFiles'], mediaFiles.filterNot(file => file.get('id') === action.payload.id));
          state.set('hasChanged', true);
        });
      }

    default:
      return state;
  }
};

var _default = entryDraftReducer;
exports.default = _default;