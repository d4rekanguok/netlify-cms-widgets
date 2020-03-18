"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUnpublishedEntry = loadUnpublishedEntry;
exports.loadUnpublishedEntries = loadUnpublishedEntries;
exports.persistUnpublishedEntry = persistUnpublishedEntry;
exports.updateUnpublishedEntryStatus = updateUnpublishedEntryStatus;
exports.deleteUnpublishedEntry = deleteUnpublishedEntry;
exports.publishUnpublishedEntry = publishUnpublishedEntry;
exports.unpublishPublishedEntry = unpublishPublishedEntry;
exports.UNPUBLISHED_ENTRY_DELETE_FAILURE = exports.UNPUBLISHED_ENTRY_DELETE_SUCCESS = exports.UNPUBLISHED_ENTRY_DELETE_REQUEST = exports.UNPUBLISHED_ENTRY_PUBLISH_FAILURE = exports.UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = exports.UNPUBLISHED_ENTRY_PUBLISH_REQUEST = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = exports.UNPUBLISHED_ENTRY_PERSIST_FAILURE = exports.UNPUBLISHED_ENTRY_PERSIST_SUCCESS = exports.UNPUBLISHED_ENTRY_PERSIST_REQUEST = exports.UNPUBLISHED_ENTRIES_FAILURE = exports.UNPUBLISHED_ENTRIES_SUCCESS = exports.UNPUBLISHED_ENTRIES_REQUEST = exports.UNPUBLISHED_ENTRY_REDIRECT = exports.UNPUBLISHED_ENTRY_SUCCESS = exports.UNPUBLISHED_ENTRY_REQUEST = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _reduxNotifications = require("redux-notifications");

var _reduxOptimist = require("redux-optimist");

var _immutable = require("immutable");

var _serializeEntryValues = require("../lib/serializeEntryValues");

var _backend = require("../backend");

var _reducers = require("../reducers");

var _collections = require("../reducers/collections");

var _publishModes = require("../constants/publishModes");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _entries = require("./entries");

var _AssetProxy = require("../valueObjects/AssetProxy");

var _media = require("./media");

var _mediaLibrary = require("./mediaLibrary");

var _validationErrorTypes = _interopRequireDefault(require("../constants/validationErrorTypes"));

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

const UNPUBLISHED_ENTRY_REQUEST = 'UNPUBLISHED_ENTRY_REQUEST';
exports.UNPUBLISHED_ENTRY_REQUEST = UNPUBLISHED_ENTRY_REQUEST;
const UNPUBLISHED_ENTRY_SUCCESS = 'UNPUBLISHED_ENTRY_SUCCESS';
exports.UNPUBLISHED_ENTRY_SUCCESS = UNPUBLISHED_ENTRY_SUCCESS;
const UNPUBLISHED_ENTRY_REDIRECT = 'UNPUBLISHED_ENTRY_REDIRECT';
exports.UNPUBLISHED_ENTRY_REDIRECT = UNPUBLISHED_ENTRY_REDIRECT;
const UNPUBLISHED_ENTRIES_REQUEST = 'UNPUBLISHED_ENTRIES_REQUEST';
exports.UNPUBLISHED_ENTRIES_REQUEST = UNPUBLISHED_ENTRIES_REQUEST;
const UNPUBLISHED_ENTRIES_SUCCESS = 'UNPUBLISHED_ENTRIES_SUCCESS';
exports.UNPUBLISHED_ENTRIES_SUCCESS = UNPUBLISHED_ENTRIES_SUCCESS;
const UNPUBLISHED_ENTRIES_FAILURE = 'UNPUBLISHED_ENTRIES_FAILURE';
exports.UNPUBLISHED_ENTRIES_FAILURE = UNPUBLISHED_ENTRIES_FAILURE;
const UNPUBLISHED_ENTRY_PERSIST_REQUEST = 'UNPUBLISHED_ENTRY_PERSIST_REQUEST';
exports.UNPUBLISHED_ENTRY_PERSIST_REQUEST = UNPUBLISHED_ENTRY_PERSIST_REQUEST;
const UNPUBLISHED_ENTRY_PERSIST_SUCCESS = 'UNPUBLISHED_ENTRY_PERSIST_SUCCESS';
exports.UNPUBLISHED_ENTRY_PERSIST_SUCCESS = UNPUBLISHED_ENTRY_PERSIST_SUCCESS;
const UNPUBLISHED_ENTRY_PERSIST_FAILURE = 'UNPUBLISHED_ENTRY_PERSIST_FAILURE';
exports.UNPUBLISHED_ENTRY_PERSIST_FAILURE = UNPUBLISHED_ENTRY_PERSIST_FAILURE;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE;
const UNPUBLISHED_ENTRY_PUBLISH_REQUEST = 'UNPUBLISHED_ENTRY_PUBLISH_REQUEST';
exports.UNPUBLISHED_ENTRY_PUBLISH_REQUEST = UNPUBLISHED_ENTRY_PUBLISH_REQUEST;
const UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = 'UNPUBLISHED_ENTRY_PUBLISH_SUCCESS';
exports.UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = UNPUBLISHED_ENTRY_PUBLISH_SUCCESS;
const UNPUBLISHED_ENTRY_PUBLISH_FAILURE = 'UNPUBLISHED_ENTRY_PUBLISH_FAILURE';
exports.UNPUBLISHED_ENTRY_PUBLISH_FAILURE = UNPUBLISHED_ENTRY_PUBLISH_FAILURE;
const UNPUBLISHED_ENTRY_DELETE_REQUEST = 'UNPUBLISHED_ENTRY_DELETE_REQUEST';
exports.UNPUBLISHED_ENTRY_DELETE_REQUEST = UNPUBLISHED_ENTRY_DELETE_REQUEST;
const UNPUBLISHED_ENTRY_DELETE_SUCCESS = 'UNPUBLISHED_ENTRY_DELETE_SUCCESS';
exports.UNPUBLISHED_ENTRY_DELETE_SUCCESS = UNPUBLISHED_ENTRY_DELETE_SUCCESS;
const UNPUBLISHED_ENTRY_DELETE_FAILURE = 'UNPUBLISHED_ENTRY_DELETE_FAILURE';
/*
 * Simple Action Creators (Internal)
 */

exports.UNPUBLISHED_ENTRY_DELETE_FAILURE = UNPUBLISHED_ENTRY_DELETE_FAILURE;

function unpublishedEntryLoading(collection, slug) {
  return {
    type: UNPUBLISHED_ENTRY_REQUEST,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function unpublishedEntryLoaded(collection, entry) {
  return {
    type: UNPUBLISHED_ENTRY_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entry
    }
  };
}

function unpublishedEntryRedirected(collection, slug) {
  return {
    type: UNPUBLISHED_ENTRY_REDIRECT,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function unpublishedEntriesLoading() {
  return {
    type: UNPUBLISHED_ENTRIES_REQUEST
  };
}

function unpublishedEntriesLoaded(entries, pagination) {
  return {
    type: UNPUBLISHED_ENTRIES_SUCCESS,
    payload: {
      entries,
      pages: pagination
    }
  };
}

function unpublishedEntriesFailed(error) {
  return {
    type: UNPUBLISHED_ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error
  };
}

function unpublishedEntryPersisting(collection, entry, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_REQUEST,
    payload: {
      collection: collection.get('name'),
      entry
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryPersisted(collection, transactionID, slug) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_SUCCESS,
    payload: {
      collection: collection.get('name'),
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryPersistedFail(error, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_FAILURE,
    payload: {
      error
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    },
    error
  };
}

function unpublishedEntryStatusChangeRequest(collection, slug, oldStatus, newStatus, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST,
    payload: {
      collection,
      slug,
      oldStatus,
      newStatus
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryStatusChangePersisted(collection, slug, oldStatus, newStatus, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS,
    payload: {
      collection,
      slug,
      oldStatus,
      newStatus
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryStatusChangeError(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}

function unpublishedEntryPublishRequest(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_REQUEST,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryPublished(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_SUCCESS,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryPublishError(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleteRequest(collection, slug, transactionID) {
  // The reducer doesn't handle this action -- it is for `optimist`.
  return {
    type: UNPUBLISHED_ENTRY_DELETE_REQUEST,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleted(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_DELETE_SUCCESS,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleteError(collection, slug, transactionID) {
  // The reducer doesn't handle this action -- it is for `optimist`.
  return {
    type: UNPUBLISHED_ENTRY_DELETE_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}
/*
 * Exported Thunk Action Creators
 */


function loadUnpublishedEntry(collection, slug) {
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const entriesLoaded = (0, _get2.default)(state.editorialWorkflow.toJS(), 'pages.ids', false); //run possible unpublishedEntries migration

    if (!entriesLoaded) {
      try {
        const {
          entries,
          pagination
        } = await backend.unpublishedEntries(state.collections);
        dispatch(unpublishedEntriesLoaded(entries, pagination)); // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    dispatch(unpublishedEntryLoading(collection, slug));

    try {
      const entry = await backend.unpublishedEntry(collection, slug);
      const assetProxies = await Promise.all(entry.mediaFiles.map(({
        url,
        file,
        path
      }) => (0, _AssetProxy.createAssetProxy)({
        path,
        url,
        file
      })));
      dispatch((0, _media.addAssets)(assetProxies));
      let mediaFiles = entry.mediaFiles.map(file => _objectSpread({}, file, {
        draft: true
      }));

      if (!collection.has('media_folder')) {
        const libraryFiles = getState().mediaLibrary.get('files') || [];
        mediaFiles = mediaFiles.concat(libraryFiles);
      }

      dispatch(unpublishedEntryLoaded(collection, _objectSpread({}, entry, {
        mediaFiles
      })));
      dispatch((0, _entries.createDraftFromEntry)(entry));
    } catch (error) {
      if (error.name === _netlifyCmsLibUtil.EDITORIAL_WORKFLOW_ERROR && error.notUnderEditorialWorkflow) {
        dispatch(unpublishedEntryRedirected(collection, slug));
        dispatch((0, _entries.loadEntry)(collection, slug));
      } else {
        dispatch(notifSend({
          message: {
            key: 'ui.toast.onFailToLoadEntries',
            details: error
          },
          kind: 'danger',
          dismissAfter: 8000
        }));
      }
    }
  };
}

function loadUnpublishedEntries(collections) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const entriesLoaded = (0, _get2.default)(state.editorialWorkflow.toJS(), 'pages.ids', false);
    if (state.config.get('publish_mode') !== _publishModes.EDITORIAL_WORKFLOW || entriesLoaded) return;
    dispatch(unpublishedEntriesLoading());
    backend.unpublishedEntries(collections).then(response => dispatch(unpublishedEntriesLoaded(response.entries, response.pagination))).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToLoadEntries',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntriesFailed(error));
      Promise.reject(error);
    });
  };
}

function persistUnpublishedEntry(collection, existingUnpublishedEntry) {
  return async (dispatch, getState) => {
    const state = getState();
    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.get('fieldsErrors');
    const unpublishedSlugs = (0, _reducers.selectUnpublishedSlugs)(state, collection.get('name'));
    const publishedSlugs = (0, _reducers.selectPublishedSlugs)(state, collection.get('name'));
    const usedSlugs = publishedSlugs.concat(unpublishedSlugs);
    const entriesLoaded = (0, _get2.default)(state.editorialWorkflow.toJS(), 'pages.ids', false); //load unpublishedEntries

    !entriesLoaded && dispatch(loadUnpublishedEntries(state.collections)); // Early return if draft contains validation errors

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
    const transactionID = (0, _v.default)();
    const entry = entryDraft.get('entry');
    const assetProxies = await (0, _entries.getMediaAssets)({
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
    const serializedData = (0, _serializeEntryValues.serializeValues)(entry.get('data'), fields);
    const serializedEntry = entry.set('data', serializedData);
    const serializedEntryDraft = entryDraft.set('entry', serializedEntry);
    dispatch(unpublishedEntryPersisting(collection, serializedEntry, transactionID));
    const persistAction = existingUnpublishedEntry ? backend.persistUnpublishedEntry : backend.persistEntry;

    try {
      const newSlug = await persistAction.call(backend, {
        config: state.config,
        collection,
        entryDraft: serializedEntryDraft,
        assetProxies,
        usedSlugs
      });
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entrySaved'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryPersisted(collection, transactionID, newSlug));
    } catch (error) {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToPersist',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(unpublishedEntryPersistedFail(error, transactionID)));
    }
  };
}

function updateUnpublishedEntryStatus(collection, slug, oldStatus, newStatus) {
  return (dispatch, getState) => {
    if (oldStatus === newStatus) return;
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    dispatch(unpublishedEntryStatusChangeRequest(collection, slug, oldStatus, newStatus, transactionID));
    backend.updateUnpublishedEntryStatus(collection, slug, newStatus).then(() => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entryUpdated'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryStatusChangePersisted(collection, slug, oldStatus, newStatus, transactionID));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToUpdateStatus',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryStatusChangeError(collection, slug, transactionID));
    });
  };
}

function deleteUnpublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    dispatch(unpublishedEntryDeleteRequest(collection, slug, transactionID));
    return backend.deleteUnpublishedEntry(collection, slug).then(() => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onDeleteUnpublishedChanges'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryDeleted(collection, slug, transactionID));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onDeleteUnpublishedChanges',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryDeleteError(collection, slug, transactionID));
    });
  };
}

function publishUnpublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const collections = state.collections;
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    const entry = (0, _reducers.selectUnpublishedEntry)(state, collection, slug);
    dispatch(unpublishedEntryPublishRequest(collection, slug, transactionID));
    return backend.publishUnpublishedEntry(entry).then(() => {
      // re-load media after entry was published
      dispatch((0, _mediaLibrary.loadMedia)());
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entryPublished'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryPublished(collection, slug, transactionID));
      return dispatch((0, _entries.loadEntry)(collections.get(collection), slug));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToPublishEntry',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryPublishError(collection, slug, transactionID));
    });
  };
}

function unpublishPublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    const entry = (0, _reducers.selectEntry)(state, collection.get('name'), slug);
    const entryDraft = (0, _immutable.Map)().set('entry', entry);
    dispatch(unpublishedEntryPersisting(collection, entry, transactionID));
    return backend.deleteEntry(state, collection, slug).then(() => backend.persistEntry({
      config: state.config,
      collection,
      entryDraft,
      assetProxies: [],
      usedSlugs: (0, _immutable.List)(),
      status: _publishModes.status.get('PENDING_PUBLISH')
    })).then(() => {
      dispatch(unpublishedEntryPersisted(collection, transactionID, slug));
      dispatch((0, _entries.entryDeleted)(collection, slug));
      dispatch(loadUnpublishedEntry(collection, slug));
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entryUnpublished'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToUnpublishEntry',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryPersistedFail(error, transactionID));
    });
  };
}