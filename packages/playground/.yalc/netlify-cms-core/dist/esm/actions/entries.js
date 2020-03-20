"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entryLoading = entryLoading;
exports.entryLoaded = entryLoaded;
exports.entryLoadError = entryLoadError;
exports.entriesLoading = entriesLoading;
exports.entriesLoaded = entriesLoaded;
exports.entriesFailed = entriesFailed;
exports.entryPersisting = entryPersisting;
exports.entryPersisted = entryPersisted;
exports.entryPersistFail = entryPersistFail;
exports.entryDeleting = entryDeleting;
exports.entryDeleted = entryDeleted;
exports.entryDeleteFail = entryDeleteFail;
exports.emptyDraftCreated = emptyDraftCreated;
exports.createDraftFromEntry = createDraftFromEntry;
exports.draftDuplicateEntry = draftDuplicateEntry;
exports.discardDraft = discardDraft;
exports.changeDraftField = changeDraftField;
exports.changeDraftFieldValidation = changeDraftFieldValidation;
exports.clearFieldErrors = clearFieldErrors;
exports.localBackupRetrieved = localBackupRetrieved;
exports.loadLocalBackup = loadLocalBackup;
exports.addDraftEntryMediaFile = addDraftEntryMediaFile;
exports.removeDraftEntryMediaFile = removeDraftEntryMediaFile;
exports.persistLocalBackup = persistLocalBackup;
exports.createDraftDuplicateFromEntry = createDraftDuplicateFromEntry;
exports.retrieveLocalBackup = retrieveLocalBackup;
exports.deleteLocalBackup = deleteLocalBackup;
exports.loadEntry = loadEntry;
exports.tryLoadEntry = tryLoadEntry;
exports.loadEntries = loadEntries;
exports.traverseCollectionCursor = traverseCollectionCursor;
exports.createEmptyDraft = createEmptyDraft;
exports.createEmptyDraftData = createEmptyDraftData;
exports.getMediaAssets = getMediaAssets;
exports.persistEntry = persistEntry;
exports.deleteEntry = deleteEntry;
exports.REMOVE_DRAFT_ENTRY_MEDIA_FILE = exports.ADD_DRAFT_ENTRY_MEDIA_FILE = exports.ENTRY_DELETE_FAILURE = exports.ENTRY_DELETE_SUCCESS = exports.ENTRY_DELETE_REQUEST = exports.ENTRY_PERSIST_FAILURE = exports.ENTRY_PERSIST_SUCCESS = exports.ENTRY_PERSIST_REQUEST = exports.DRAFT_CREATE_DUPLICATE_FROM_ENTRY = exports.DRAFT_CREATE_FROM_LOCAL_BACKUP = exports.DRAFT_LOCAL_BACKUP_RETRIEVED = exports.DRAFT_CLEAR_ERRORS = exports.DRAFT_VALIDATION_ERRORS = exports.DRAFT_CHANGE_FIELD = exports.DRAFT_DISCARD = exports.DRAFT_CREATE_EMPTY = exports.DRAFT_CREATE_FROM_ENTRY = exports.ENTRIES_FAILURE = exports.ENTRIES_SUCCESS = exports.ENTRIES_REQUEST = exports.ENTRY_FAILURE = exports.ENTRY_SUCCESS = exports.ENTRY_REQUEST = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _immutable = require("immutable");

var _reduxNotifications = require("redux-notifications");

var _serializeEntryValues = require("../lib/serializeEntryValues");

var _backend = require("../backend");

var _integrations = require("../integrations");

var _reducers = require("../reducers");

var _collections = require("../reducers/collections");

var _cursors = require("../reducers/cursors");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _Entry = require("../valueObjects/Entry");

var _AssetProxy = require("../valueObjects/AssetProxy");

var _validationErrorTypes = _interopRequireDefault(require("../constants/validationErrorTypes"));

var _media = require("./media");

var _mediaLibrary = require("./mediaLibrary");

var _waitUntil = require("./waitUntil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  notifSend
} = _reduxNotifications.actions;
/*
 * Constant Declarations
 */

const ENTRY_REQUEST = 'ENTRY_REQUEST';
exports.ENTRY_REQUEST = ENTRY_REQUEST;
const ENTRY_SUCCESS = 'ENTRY_SUCCESS';
exports.ENTRY_SUCCESS = ENTRY_SUCCESS;
const ENTRY_FAILURE = 'ENTRY_FAILURE';
exports.ENTRY_FAILURE = ENTRY_FAILURE;
const ENTRIES_REQUEST = 'ENTRIES_REQUEST';
exports.ENTRIES_REQUEST = ENTRIES_REQUEST;
const ENTRIES_SUCCESS = 'ENTRIES_SUCCESS';
exports.ENTRIES_SUCCESS = ENTRIES_SUCCESS;
const ENTRIES_FAILURE = 'ENTRIES_FAILURE';
exports.ENTRIES_FAILURE = ENTRIES_FAILURE;
const DRAFT_CREATE_FROM_ENTRY = 'DRAFT_CREATE_FROM_ENTRY';
exports.DRAFT_CREATE_FROM_ENTRY = DRAFT_CREATE_FROM_ENTRY;
const DRAFT_CREATE_EMPTY = 'DRAFT_CREATE_EMPTY';
exports.DRAFT_CREATE_EMPTY = DRAFT_CREATE_EMPTY;
const DRAFT_DISCARD = 'DRAFT_DISCARD';
exports.DRAFT_DISCARD = DRAFT_DISCARD;
const DRAFT_CHANGE_FIELD = 'DRAFT_CHANGE_FIELD';
exports.DRAFT_CHANGE_FIELD = DRAFT_CHANGE_FIELD;
const DRAFT_VALIDATION_ERRORS = 'DRAFT_VALIDATION_ERRORS';
exports.DRAFT_VALIDATION_ERRORS = DRAFT_VALIDATION_ERRORS;
const DRAFT_CLEAR_ERRORS = 'DRAFT_CLEAR_ERRORS';
exports.DRAFT_CLEAR_ERRORS = DRAFT_CLEAR_ERRORS;
const DRAFT_LOCAL_BACKUP_RETRIEVED = 'DRAFT_LOCAL_BACKUP_RETRIEVED';
exports.DRAFT_LOCAL_BACKUP_RETRIEVED = DRAFT_LOCAL_BACKUP_RETRIEVED;
const DRAFT_CREATE_FROM_LOCAL_BACKUP = 'DRAFT_CREATE_FROM_LOCAL_BACKUP';
exports.DRAFT_CREATE_FROM_LOCAL_BACKUP = DRAFT_CREATE_FROM_LOCAL_BACKUP;
const DRAFT_CREATE_DUPLICATE_FROM_ENTRY = 'DRAFT_CREATE_DUPLICATE_FROM_ENTRY';
exports.DRAFT_CREATE_DUPLICATE_FROM_ENTRY = DRAFT_CREATE_DUPLICATE_FROM_ENTRY;
const ENTRY_PERSIST_REQUEST = 'ENTRY_PERSIST_REQUEST';
exports.ENTRY_PERSIST_REQUEST = ENTRY_PERSIST_REQUEST;
const ENTRY_PERSIST_SUCCESS = 'ENTRY_PERSIST_SUCCESS';
exports.ENTRY_PERSIST_SUCCESS = ENTRY_PERSIST_SUCCESS;
const ENTRY_PERSIST_FAILURE = 'ENTRY_PERSIST_FAILURE';
exports.ENTRY_PERSIST_FAILURE = ENTRY_PERSIST_FAILURE;
const ENTRY_DELETE_REQUEST = 'ENTRY_DELETE_REQUEST';
exports.ENTRY_DELETE_REQUEST = ENTRY_DELETE_REQUEST;
const ENTRY_DELETE_SUCCESS = 'ENTRY_DELETE_SUCCESS';
exports.ENTRY_DELETE_SUCCESS = ENTRY_DELETE_SUCCESS;
const ENTRY_DELETE_FAILURE = 'ENTRY_DELETE_FAILURE';
exports.ENTRY_DELETE_FAILURE = ENTRY_DELETE_FAILURE;
const ADD_DRAFT_ENTRY_MEDIA_FILE = 'ADD_DRAFT_ENTRY_MEDIA_FILE';
exports.ADD_DRAFT_ENTRY_MEDIA_FILE = ADD_DRAFT_ENTRY_MEDIA_FILE;
const REMOVE_DRAFT_ENTRY_MEDIA_FILE = 'REMOVE_DRAFT_ENTRY_MEDIA_FILE';
/*
 * Simple Action Creators (Internal)
 * We still need to export them for tests
 */

exports.REMOVE_DRAFT_ENTRY_MEDIA_FILE = REMOVE_DRAFT_ENTRY_MEDIA_FILE;

function entryLoading(collection, slug) {
  return {
    type: ENTRY_REQUEST,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function entryLoaded(collection, entry) {
  return {
    type: ENTRY_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entry
    }
  };
}

function entryLoadError(error, collection, slug) {
  return {
    type: ENTRY_FAILURE,
    payload: {
      error,
      collection: collection.get('name'),
      slug
    }
  };
}

function entriesLoading(collection) {
  return {
    type: ENTRIES_REQUEST,
    payload: {
      collection: collection.get('name')
    }
  };
}

function entriesLoaded(collection, entries, pagination, cursor, append = true) {
  return {
    type: ENTRIES_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entries,
      page: pagination,
      cursor: _netlifyCmsLibUtil.Cursor.create(cursor),
      append
    }
  };
}

function entriesFailed(collection, error) {
  return {
    type: ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error.toString(),
    meta: {
      collection: collection.get('name')
    }
  };
}

function entryPersisting(collection, entry) {
  return {
    type: ENTRY_PERSIST_REQUEST,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug')
    }
  };
}

function entryPersisted(collection, entry, slug) {
  return {
    type: ENTRY_PERSIST_SUCCESS,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug'),

      /**
       * Pass slug from backend for newly created entries.
       */
      slug
    }
  };
}

function entryPersistFail(collection, entry, error) {
  return {
    type: ENTRY_PERSIST_FAILURE,
    error: 'Failed to persist entry',
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug'),
      error: error.toString()
    }
  };
}

function entryDeleting(collection, slug) {
  return {
    type: ENTRY_DELETE_REQUEST,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug
    }
  };
}

function entryDeleted(collection, slug) {
  return {
    type: ENTRY_DELETE_SUCCESS,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug
    }
  };
}

function entryDeleteFail(collection, slug, error) {
  return {
    type: ENTRY_DELETE_FAILURE,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug,
      error: error.toString()
    }
  };
}

function emptyDraftCreated(entry) {
  return {
    type: DRAFT_CREATE_EMPTY,
    payload: entry
  };
}
/*
 * Exported simple Action Creators
 */


function createDraftFromEntry(entry) {
  return {
    type: DRAFT_CREATE_FROM_ENTRY,
    payload: {
      entry
    }
  };
}

function draftDuplicateEntry(entry) {
  return {
    type: DRAFT_CREATE_DUPLICATE_FROM_ENTRY,
    payload: (0, _Entry.createEntry)(entry.get('collection'), '', '', {
      data: entry.get('data')
    })
  };
}

function discardDraft() {
  return {
    type: DRAFT_DISCARD
  };
}

function changeDraftField(field, value, metadata, entries) {
  return {
    type: DRAFT_CHANGE_FIELD,
    payload: {
      field,
      value,
      metadata,
      entries
    }
  };
}

function changeDraftFieldValidation(uniquefieldId, errors) {
  return {
    type: DRAFT_VALIDATION_ERRORS,
    payload: {
      uniquefieldId,
      errors
    }
  };
}

function clearFieldErrors() {
  return {
    type: DRAFT_CLEAR_ERRORS
  };
}

function localBackupRetrieved(entry) {
  return {
    type: DRAFT_LOCAL_BACKUP_RETRIEVED,
    payload: {
      entry
    }
  };
}

function loadLocalBackup() {
  return {
    type: DRAFT_CREATE_FROM_LOCAL_BACKUP
  };
}

function addDraftEntryMediaFile(file) {
  return {
    type: ADD_DRAFT_ENTRY_MEDIA_FILE,
    payload: file
  };
}

function removeDraftEntryMediaFile({
  id
}) {
  return {
    type: REMOVE_DRAFT_ENTRY_MEDIA_FILE,
    payload: {
      id
    }
  };
}

function persistLocalBackup(entry, collection) {
  return (_dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    return backend.persistLocalDraftBackup(entry, collection);
  };
}

function createDraftDuplicateFromEntry(entry) {
  return dispatch => {
    dispatch((0, _waitUntil.waitUntil)({
      predicate: ({
        type
      }) => type === DRAFT_CREATE_EMPTY,
      run: () => dispatch(draftDuplicateEntry(entry))
    }));
  };
}

function retrieveLocalBackup(collection, slug) {
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const {
      entry
    } = await backend.getLocalDraftBackup(collection, slug);

    if (entry) {
      // load assets from backup
      const mediaFiles = entry.mediaFiles || [];
      const assetProxies = await Promise.all(mediaFiles.map(file => {
        if (file.file || file.url) {
          return (0, _AssetProxy.createAssetProxy)({
            path: file.path,
            file: file.file,
            url: file.url,
            field: file.field
          });
        } else {
          return (0, _media.getAsset)({
            collection,
            entry: (0, _immutable.fromJS)(entry),
            path: file.path,
            field: file.field
          })(dispatch, getState);
        }
      }));
      dispatch((0, _media.addAssets)(assetProxies));
      return dispatch(localBackupRetrieved(entry));
    }
  };
}

function deleteLocalBackup(collection, slug) {
  return (_dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    return backend.deleteLocalDraftBackup(collection, slug);
  };
}
/*
 * Exported Thunk Action Creators
 */


function loadEntry(collection, slug) {
  return async (dispatch, getState) => {
    await (0, _mediaLibrary.waitForMediaLibraryToLoad)(dispatch, getState());
    dispatch(entryLoading(collection, slug));

    try {
      const loadedEntry = await tryLoadEntry(getState(), collection, slug);
      dispatch(entryLoaded(collection, loadedEntry));
      dispatch(createDraftFromEntry(loadedEntry));
    } catch (error) {
      console.error(error);
      dispatch(notifSend({
        message: {
          details: error.message,
          key: 'ui.toast.onFailToLoadEntries'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(entryLoadError(error, collection, slug));
    }
  };
}

async function tryLoadEntry(state, collection, slug) {
  const backend = (0, _backend.currentBackend)(state.config);
  const loadedEntry = await backend.getEntry(state, collection, slug);
  return loadedEntry;
}

const appendActions = (0, _immutable.fromJS)({
  ['append_next']: {
    action: 'next',
    append: true
  }
});

const addAppendActionsToCursor = cursor => {
  return _netlifyCmsLibUtil.Cursor.create(cursor).updateStore('actions', actions => {
    return actions.union(appendActions.filter(v => actions.has(v.get('action'))).keySeq());
  });
};

function loadEntries(collection, page = 0) {
  return (dispatch, getState) => {
    if (collection.get('isFetching')) {
      return;
    }

    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, collection.get('name'), 'listEntries');
    const provider = integration ? (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration) : backend;
    const append = !!(page && !isNaN(page) && page > 0);
    dispatch(entriesLoading(collection));
    provider.listEntries(collection, page).then(response => _objectSpread({}, response, {
      // The only existing backend using the pagination system is the
      // Algolia integration, which is also the only integration used
      // to list entries. Thus, this checking for an integration can
      // determine whether or not this is using the old integer-based
      // pagination API. Other backends will simply store an empty
      // cursor, which behaves identically to no cursor at all.
      cursor: integration ? _netlifyCmsLibUtil.Cursor.create({
        actions: ['next'],
        meta: {
          usingOldPaginationAPI: true
        },
        data: {
          nextPage: page + 1
        }
      }) : _netlifyCmsLibUtil.Cursor.create(response.cursor)
    })).then(response => dispatch(entriesLoaded(collection, response.cursor.meta.get('usingOldPaginationAPI') ? response.entries.reverse() : response.entries, response.pagination, addAppendActionsToCursor(response.cursor), append))).catch(err => {
      dispatch(notifSend({
        message: {
          details: err,
          key: 'ui.toast.onFailToLoadEntries'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    });
  };
}

function traverseCursor(backend, cursor, action) {
  if (!cursor.actions.has(action)) {
    throw new Error("The current cursor does not support the pagination action \"".concat(action, "\"."));
  }

  return backend.traverseCursor(cursor, action);
}

function traverseCollectionCursor(collection, action) {
  return async (dispatch, getState) => {
    const state = getState();
    const collectionName = collection.get('name');

    if (state.entries.getIn(['pages', "".concat(collectionName), 'isFetching'])) {
      return;
    }

    const backend = (0, _backend.currentBackend)(state.config);
    const {
      action: realAction,
      append
    } = appendActions.has(action) ? appendActions.get(action).toJS() : {
      action,
      append: false
    };
    const cursor = (0, _cursors.selectCollectionEntriesCursor)(state.cursors, collection.get('name')); // Handle cursors representing pages in the old, integer-based
    // pagination API

    if (cursor.meta.get('usingOldPaginationAPI', false)) {
      return dispatch(loadEntries(collection, cursor.data.get('nextPage')));
    }

    try {
      dispatch(entriesLoading(collection));
      const {
        entries,
        cursor: newCursor
      } = await traverseCursor(backend, cursor, realAction); // Pass null for the old pagination argument - this will
      // eventually be removed.

      return dispatch(entriesLoaded(collection, entries, null, addAppendActionsToCursor(newCursor), append));
    } catch (err) {
      console.error(err);
      dispatch(notifSend({
        message: {
          details: err,
          key: 'ui.toast.onFailToPersist'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    }
  };
}

const escapeHtml = unsafe => {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

const processValue = unsafe => {
  if (['true', 'True', 'TRUE'].includes(unsafe)) {
    return true;
  }

  if (['false', 'False', 'FALSE'].includes(unsafe)) {
    return false;
  }

  return escapeHtml(unsafe);
};

function createEmptyDraft(collection, search) {
  return async (dispatch, getState) => {
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      collection = (0, _collections.updateFieldByKey)(collection, key, field => field.set('default', processValue(value)));
    });
    const fields = collection.get('fields', (0, _immutable.List)());
    const dataFields = createEmptyDraftData(fields);
    let mediaFiles = [];

    if (!collection.has('media_folder')) {
      await (0, _mediaLibrary.waitForMediaLibraryToLoad)(dispatch, getState());
      mediaFiles = getState().mediaLibrary.get('files');
    }

    const newEntry = (0, _Entry.createEntry)(collection.get('name'), '', '', {
      data: dataFields,
      mediaFiles
    });
    dispatch(emptyDraftCreated(newEntry));
  };
}

function createEmptyDraftData(fields, withNameKey = true) {
  return fields.reduce((reduction, value) => {
    const acc = reduction;
    const item = value;
    const subfields = item.get('field') || item.get('fields');
    const list = item.get('widget') == 'list';
    const name = item.get('name');
    const defaultValue = item.get('default', null);

    const isEmptyDefaultValue = val => [[{}], {}].some(e => (0, _isEqual2.default)(val, e));

    if (_immutable.List.isList(subfields)) {
      const subDefaultValue = list ? [createEmptyDraftData(subfields)] : createEmptyDraftData(subfields);

      if (!isEmptyDefaultValue(subDefaultValue)) {
        acc[name] = subDefaultValue;
      }

      return acc;
    }

    if (_immutable.Map.isMap(subfields)) {
      const subDefaultValue = list ? [createEmptyDraftData((0, _immutable.List)([subfields]), false)] : createEmptyDraftData((0, _immutable.List)([subfields]));

      if (!isEmptyDefaultValue(subDefaultValue)) {
        acc[name] = subDefaultValue;
      }

      return acc;
    }

    if (defaultValue !== null) {
      if (!withNameKey) {
        return defaultValue;
      }

      acc[name] = defaultValue;
    }

    return acc;
  }, {});
}

async function getMediaAssets({
  getState,
  dispatch,
  collection,
  entry
}) {
  const filesArray = entry.get('mediaFiles').toArray();
  const assets = await Promise.all(filesArray.filter(file => file.get('draft')).map(file => (0, _media.getAsset)({
    collection,
    entry,
    path: file.get('path'),
    field: file.get('field')
  })(dispatch, getState)));
  return assets;
}

function persistEntry(collection) {
  return async (dispatch, getState) => {
    const state = getState();
    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.get('fieldsErrors');
    const usedSlugs = (0, _reducers.selectPublishedSlugs)(state, collection.get('name')); // Early return if draft contains validation errors

    if (!fieldsErrors.isEmpty()) {
      const hasPresenceErrors = fieldsErrors.some(errors => errors.some(error => error.type && error.type === _validationErrorTypes.default.PRESENCE));

      if (hasPresenceErrors) {
        dispatch(notifSend({
          message: {
            key: 'ui.toast.missingRequiredField'
          },
          kind: 'danger',
          dismissAfter: 8000
        }));
      }

      return Promise.reject();
    }

    const backend = (0, _backend.currentBackend)(state.config);
    const entry = entryDraft.get('entry');
    const assetProxies = await getMediaAssets({
      getState,
      dispatch,
      collection,
      entry
    });
    /**
     * Serialize the values of any fields with registered serializers, and
     * update the entry and entryDraft with the serialized values.
     */

    const fields = (0, _collections.selectFields)(collection, entry.get('slug'));
    const serializedData = (0, _serializeEntryValues.serializeValues)(entryDraft.getIn(['entry', 'data']), fields);
    const serializedEntry = entry.set('data', serializedData);
    const serializedEntryDraft = entryDraft.set('entry', serializedEntry);
    dispatch(entryPersisting(collection, serializedEntry));
    return backend.persistEntry({
      config: state.config,
      collection,
      entryDraft: serializedEntryDraft,
      assetProxies,
      usedSlugs
    }).then(slug => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entrySaved'
        },
        kind: 'success',
        dismissAfter: 4000
      })); // re-load media library if entry had media files

      if (assetProxies.length > 0) {
        dispatch((0, _mediaLibrary.loadMedia)());
      }

      dispatch(entryPersisted(collection, serializedEntry, slug));
    }).catch(error => {
      console.error(error);
      dispatch(notifSend({
        message: {
          details: error,
          key: 'ui.toast.onFailToPersist'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entryPersistFail(collection, serializedEntry, error)));
    });
  };
}

function deleteEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    dispatch(entryDeleting(collection, slug));
    return backend.deleteEntry(state, collection, slug).then(() => {
      return dispatch(entryDeleted(collection, slug));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          details: error,
          key: 'ui.toast.onFailToDelete'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      console.error(error);
      return Promise.reject(dispatch(entryDeleteFail(collection, slug, error)));
    });
  };
}