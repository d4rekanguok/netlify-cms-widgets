"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMediaLibrary = createMediaLibrary;
exports.clearMediaControl = clearMediaControl;
exports.removeMediaControl = removeMediaControl;
exports.openMediaLibrary = openMediaLibrary;
exports.closeMediaLibrary = closeMediaLibrary;
exports.insertMedia = insertMedia;
exports.removeInsertedMedia = removeInsertedMedia;
exports.loadMedia = loadMedia;
exports.persistMedia = persistMedia;
exports.deleteMedia = deleteMedia;
exports.getMediaFile = getMediaFile;
exports.loadMediaDisplayURL = loadMediaDisplayURL;
exports.mediaLoading = mediaLoading;
exports.mediaLoaded = mediaLoaded;
exports.mediaLoadFailed = mediaLoadFailed;
exports.mediaPersisting = mediaPersisting;
exports.mediaPersisted = mediaPersisted;
exports.mediaPersistFailed = mediaPersistFailed;
exports.mediaDeleting = mediaDeleting;
exports.mediaDeleted = mediaDeleted;
exports.mediaDeleteFailed = mediaDeleteFailed;
exports.mediaDisplayURLRequest = mediaDisplayURLRequest;
exports.mediaDisplayURLSuccess = mediaDisplayURLSuccess;
exports.mediaDisplayURLFailure = mediaDisplayURLFailure;
exports.waitForMediaLibraryToLoad = waitForMediaLibraryToLoad;
exports.getMediaDisplayURL = getMediaDisplayURL;
exports.MEDIA_DISPLAY_URL_FAILURE = exports.MEDIA_DISPLAY_URL_SUCCESS = exports.MEDIA_DISPLAY_URL_REQUEST = exports.MEDIA_DELETE_FAILURE = exports.MEDIA_DELETE_SUCCESS = exports.MEDIA_DELETE_REQUEST = exports.MEDIA_PERSIST_FAILURE = exports.MEDIA_PERSIST_SUCCESS = exports.MEDIA_PERSIST_REQUEST = exports.MEDIA_LOAD_FAILURE = exports.MEDIA_LOAD_SUCCESS = exports.MEDIA_LOAD_REQUEST = exports.MEDIA_REMOVE_INSERTED = exports.MEDIA_INSERT = exports.MEDIA_LIBRARY_CREATE = exports.MEDIA_LIBRARY_CLOSE = exports.MEDIA_LIBRARY_OPEN = void 0;

var _immutable = require("immutable");

var _reduxNotifications = require("redux-notifications");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _backend = require("../backend");

var _AssetProxy = require("../valueObjects/AssetProxy");

var _reducers = require("../reducers");

var _entries = require("../reducers/entries");

var _mediaLibrary = require("../reducers/mediaLibrary");

var _integrations = require("../integrations");

var _media = require("./media");

var _entries2 = require("./entries");

var _urlHelper = require("../lib/urlHelper");

var _waitUntil = require("./waitUntil");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  notifSend
} = _reduxNotifications.actions;
const MEDIA_LIBRARY_OPEN = 'MEDIA_LIBRARY_OPEN';
exports.MEDIA_LIBRARY_OPEN = MEDIA_LIBRARY_OPEN;
const MEDIA_LIBRARY_CLOSE = 'MEDIA_LIBRARY_CLOSE';
exports.MEDIA_LIBRARY_CLOSE = MEDIA_LIBRARY_CLOSE;
const MEDIA_LIBRARY_CREATE = 'MEDIA_LIBRARY_CREATE';
exports.MEDIA_LIBRARY_CREATE = MEDIA_LIBRARY_CREATE;
const MEDIA_INSERT = 'MEDIA_INSERT';
exports.MEDIA_INSERT = MEDIA_INSERT;
const MEDIA_REMOVE_INSERTED = 'MEDIA_REMOVE_INSERTED';
exports.MEDIA_REMOVE_INSERTED = MEDIA_REMOVE_INSERTED;
const MEDIA_LOAD_REQUEST = 'MEDIA_LOAD_REQUEST';
exports.MEDIA_LOAD_REQUEST = MEDIA_LOAD_REQUEST;
const MEDIA_LOAD_SUCCESS = 'MEDIA_LOAD_SUCCESS';
exports.MEDIA_LOAD_SUCCESS = MEDIA_LOAD_SUCCESS;
const MEDIA_LOAD_FAILURE = 'MEDIA_LOAD_FAILURE';
exports.MEDIA_LOAD_FAILURE = MEDIA_LOAD_FAILURE;
const MEDIA_PERSIST_REQUEST = 'MEDIA_PERSIST_REQUEST';
exports.MEDIA_PERSIST_REQUEST = MEDIA_PERSIST_REQUEST;
const MEDIA_PERSIST_SUCCESS = 'MEDIA_PERSIST_SUCCESS';
exports.MEDIA_PERSIST_SUCCESS = MEDIA_PERSIST_SUCCESS;
const MEDIA_PERSIST_FAILURE = 'MEDIA_PERSIST_FAILURE';
exports.MEDIA_PERSIST_FAILURE = MEDIA_PERSIST_FAILURE;
const MEDIA_DELETE_REQUEST = 'MEDIA_DELETE_REQUEST';
exports.MEDIA_DELETE_REQUEST = MEDIA_DELETE_REQUEST;
const MEDIA_DELETE_SUCCESS = 'MEDIA_DELETE_SUCCESS';
exports.MEDIA_DELETE_SUCCESS = MEDIA_DELETE_SUCCESS;
const MEDIA_DELETE_FAILURE = 'MEDIA_DELETE_FAILURE';
exports.MEDIA_DELETE_FAILURE = MEDIA_DELETE_FAILURE;
const MEDIA_DISPLAY_URL_REQUEST = 'MEDIA_DISPLAY_URL_REQUEST';
exports.MEDIA_DISPLAY_URL_REQUEST = MEDIA_DISPLAY_URL_REQUEST;
const MEDIA_DISPLAY_URL_SUCCESS = 'MEDIA_DISPLAY_URL_SUCCESS';
exports.MEDIA_DISPLAY_URL_SUCCESS = MEDIA_DISPLAY_URL_SUCCESS;
const MEDIA_DISPLAY_URL_FAILURE = 'MEDIA_DISPLAY_URL_FAILURE';
exports.MEDIA_DISPLAY_URL_FAILURE = MEDIA_DISPLAY_URL_FAILURE;

function createMediaLibrary(instance) {
  const api = {
    show: instance.show || (() => undefined),
    hide: instance.hide || (() => undefined),
    onClearControl: instance.onClearControl || (() => undefined),
    onRemoveControl: instance.onRemoveControl || (() => undefined),
    enableStandalone: instance.enableStandalone || (() => undefined)
  };
  return {
    type: MEDIA_LIBRARY_CREATE,
    payload: api
  };
}

function clearMediaControl(id) {
  return (_dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.onClearControl({
        id
      });
    }
  };
}

function removeMediaControl(id) {
  return (_dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.onRemoveControl({
        id
      });
    }
  };
}

function openMediaLibrary(payload = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      const {
        controlID: id,
        value,
        config = (0, _immutable.Map)(),
        allowMultiple,
        forImage
      } = payload;
      mediaLibrary.show({
        id,
        value,
        config: config.toJS(),
        allowMultiple,
        imagesOnly: forImage
      });
    }

    dispatch({
      type: MEDIA_LIBRARY_OPEN,
      payload
    });
  };
}

function closeMediaLibrary() {
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.hide();
    }

    dispatch({
      type: MEDIA_LIBRARY_CLOSE
    });
  };
}

function insertMedia(mediaPath, field) {
  return (dispatch, getState) => {
    const state = getState();
    const config = state.config;
    const entry = state.entryDraft.get('entry');
    const collectionName = state.entryDraft.getIn(['entry', 'collection']);
    const collection = state.collections.get(collectionName);

    if (Array.isArray(mediaPath)) {
      mediaPath = mediaPath.map(path => (0, _entries.selectMediaFilePublicPath)(config, collection, path, entry, field));
    } else {
      mediaPath = (0, _entries.selectMediaFilePublicPath)(config, collection, mediaPath, entry, field);
    }

    dispatch({
      type: MEDIA_INSERT,
      payload: {
        mediaPath
      }
    });
  };
}

function removeInsertedMedia(controlID) {
  return {
    type: MEDIA_REMOVE_INSERTED,
    payload: {
      controlID
    }
  };
}

function loadMedia(opts = {}) {
  const {
    delay = 0,
    query = '',
    page = 1,
    privateUpload
  } = opts;
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');

    if (integration) {
      const provider = (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration);
      dispatch(mediaLoading(page));

      try {
        const files = await provider.retrieve(query, page, privateUpload);
        const mediaLoadedOpts = {
          page,
          canPaginate: true,
          dynamicSearch: true,
          dynamicSearchQuery: query,
          privateUpload
        };
        return dispatch(mediaLoaded(files, mediaLoadedOpts));
      } catch (error) {
        return dispatch(mediaLoadFailed({
          privateUpload
        }));
      }
    }

    dispatch(mediaLoading(page));

    const loadFunction = () => backend.getMedia().then(files => dispatch(mediaLoaded(files))).catch(error => {
      console.error(error);

      if (error.status === 404) {
        console.log('This 404 was expected and handled appropriately.');
        dispatch(mediaLoaded([]));
      } else {
        dispatch(mediaLoadFailed());
      }
    });

    if (delay > 0) {
      return new Promise(resolve => {
        setTimeout(() => resolve(loadFunction()), delay);
      });
    } else {
      return loadFunction();
    }
  };
}

function createMediaFileFromAsset({
  id,
  file,
  assetProxy,
  draft
}) {
  const mediaFile = {
    id,
    name: (0, _netlifyCmsLibUtil.basename)(assetProxy.path),
    displayURL: assetProxy.url,
    draft,
    size: file.size,
    url: assetProxy.url,
    path: assetProxy.path,
    field: assetProxy.field
  };
  return mediaFile;
}

function persistMedia(file, opts = {}) {
  const {
    privateUpload,
    field
  } = opts;
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');
    const files = (0, _mediaLibrary.selectMediaFiles)(state, field);
    const fileName = (0, _urlHelper.sanitizeSlug)(file.name.toLowerCase(), state.config.get('slug'));
    const existingFile = files.find(existingFile => existingFile.name.toLowerCase() === fileName);
    const editingDraft = (0, _entries.selectEditingDraft)(state.entryDraft);
    /**
     * Check for existing files of the same name before persisting. If no asset
     * store integration is used, files are being stored in Git, so we can
     * expect file names to be unique. If an asset store is in use, file names
     * may not be unique, so we forego this check.
     */

    if (!integration && existingFile) {
      if (!window.confirm("".concat(existingFile.name, " already exists. Do you want to replace it?"))) {
        return;
      } else {
        await dispatch(deleteMedia(existingFile, {
          privateUpload
        }));
      }
    }

    if (integration || !editingDraft) {
      dispatch(mediaPersisting());
    }

    try {
      let assetProxy;

      if (integration) {
        try {
          const provider = (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration);
          const response = await provider.upload(file, privateUpload);
          assetProxy = (0, _AssetProxy.createAssetProxy)({
            url: response.asset.url,
            path: response.asset.url
          });
        } catch (error) {
          assetProxy = (0, _AssetProxy.createAssetProxy)({
            file,
            path: fileName
          });
        }
      } else if (privateUpload) {
        throw new Error('The Private Upload option is only available for Asset Store Integration');
      } else {
        const entry = state.entryDraft.get('entry');
        const collection = state.collections.get(entry === null || entry === void 0 ? void 0 : entry.get('collection'));
        const path = (0, _entries.selectMediaFilePath)(state.config, collection, entry, fileName, field);
        assetProxy = (0, _AssetProxy.createAssetProxy)({
          file,
          path,
          field
        });
      }

      dispatch((0, _media.addAsset)(assetProxy));
      let mediaFile;

      if (integration) {
        const id = await (0, _netlifyCmsLibUtil.getBlobSHA)(file); // integration assets are persisted immediately, thus draft is false

        mediaFile = createMediaFileFromAsset({
          id,
          file,
          assetProxy,
          draft: false
        });
      } else if (editingDraft) {
        const id = await (0, _netlifyCmsLibUtil.getBlobSHA)(file);
        mediaFile = createMediaFileFromAsset({
          id,
          file,
          assetProxy,
          draft: editingDraft
        });
        return dispatch((0, _entries2.addDraftEntryMediaFile)(mediaFile));
      } else {
        mediaFile = await backend.persistMedia(state.config, assetProxy);
      }

      return dispatch(mediaPersisted(mediaFile, {
        privateUpload
      }));
    } catch (error) {
      console.error(error);
      dispatch(notifSend({
        message: "Failed to persist media: ".concat(error),
        kind: 'danger',
        dismissAfter: 8000
      }));
      return dispatch(mediaPersistFailed({
        privateUpload
      }));
    }
  };
}

function deleteMedia(file, opts = {}) {
  const {
    privateUpload
  } = opts;
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');

    if (integration) {
      const provider = (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration);
      dispatch(mediaDeleting());

      try {
        await provider.delete(file.id);
        return dispatch(mediaDeleted(file, {
          privateUpload
        }));
      } catch (error) {
        console.error(error);
        dispatch(notifSend({
          message: "Failed to delete media: ".concat(error.message),
          kind: 'danger',
          dismissAfter: 8000
        }));
        return dispatch(mediaDeleteFailed({
          privateUpload
        }));
      }
    }

    try {
      if (file.draft) {
        dispatch((0, _media.removeAsset)(file.path));
        dispatch((0, _entries2.removeDraftEntryMediaFile)({
          id: file.id
        }));
      } else {
        const editingDraft = (0, _entries.selectEditingDraft)(state.entryDraft);
        dispatch(mediaDeleting());
        dispatch((0, _media.removeAsset)(file.path));
        await backend.deleteMedia(state.config, file.path);
        dispatch(mediaDeleted(file));

        if (editingDraft) {
          dispatch((0, _entries2.removeDraftEntryMediaFile)({
            id: file.id
          }));
        }
      }
    } catch (error) {
      console.error(error);
      dispatch(notifSend({
        message: "Failed to delete media: ".concat(error.message),
        kind: 'danger',
        dismissAfter: 8000
      }));
      return dispatch(mediaDeleteFailed());
    }
  };
}

async function getMediaFile(state, path) {
  const backend = (0, _backend.currentBackend)(state.config);
  const {
    url
  } = await backend.getMediaFile(path);
  return {
    url
  };
}

function loadMediaDisplayURL(file) {
  return async (dispatch, getState) => {
    const {
      displayURL,
      id
    } = file;
    const state = getState();
    const displayURLState = (0, _mediaLibrary.selectMediaDisplayURL)(state, id);

    if (!id || !displayURL || displayURLState.get('url') || displayURLState.get('isFetching') || displayURLState.get('err')) {
      return Promise.resolve();
    }

    if (typeof displayURL === 'string') {
      dispatch(mediaDisplayURLRequest(id));
      dispatch(mediaDisplayURLSuccess(id, displayURL));
      return;
    }

    try {
      const backend = (0, _backend.currentBackend)(state.config);
      dispatch(mediaDisplayURLRequest(id));
      const newURL = await backend.getMediaDisplayURL(displayURL);

      if (newURL) {
        dispatch(mediaDisplayURLSuccess(id, newURL));
      } else {
        throw new Error('No display URL was returned!');
      }
    } catch (err) {
      dispatch(mediaDisplayURLFailure(id, err));
    }
  };
}

function mediaLoading(page) {
  return {
    type: MEDIA_LOAD_REQUEST,
    payload: {
      page
    }
  };
}

function mediaLoaded(files, opts = {}) {
  return {
    type: MEDIA_LOAD_SUCCESS,
    payload: _objectSpread({
      files
    }, opts)
  };
}

function mediaLoadFailed(opts = {}) {
  const {
    privateUpload
  } = opts;
  return {
    type: MEDIA_LOAD_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaPersisting() {
  return {
    type: MEDIA_PERSIST_REQUEST
  };
}

function mediaPersisted(file, opts = {}) {
  const {
    privateUpload
  } = opts;
  return {
    type: MEDIA_PERSIST_SUCCESS,
    payload: {
      file,
      privateUpload
    }
  };
}

function mediaPersistFailed(opts = {}) {
  const {
    privateUpload
  } = opts;
  return {
    type: MEDIA_PERSIST_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaDeleting() {
  return {
    type: MEDIA_DELETE_REQUEST
  };
}

function mediaDeleted(file, opts = {}) {
  const {
    privateUpload
  } = opts;
  return {
    type: MEDIA_DELETE_SUCCESS,
    payload: {
      file,
      privateUpload
    }
  };
}

function mediaDeleteFailed(opts = {}) {
  const {
    privateUpload
  } = opts;
  return {
    type: MEDIA_DELETE_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaDisplayURLRequest(key) {
  return {
    type: MEDIA_DISPLAY_URL_REQUEST,
    payload: {
      key
    }
  };
}

function mediaDisplayURLSuccess(key, url) {
  return {
    type: MEDIA_DISPLAY_URL_SUCCESS,
    payload: {
      key,
      url
    }
  };
}

function mediaDisplayURLFailure(key, err) {
  console.error(err);
  return {
    type: MEDIA_DISPLAY_URL_FAILURE,
    payload: {
      key,
      err
    }
  };
}

async function waitForMediaLibraryToLoad(dispatch, state) {
  if (state.mediaLibrary.get('isLoading') !== false && !state.mediaLibrary.get('externalLibrary')) {
    await (0, _waitUntil.waitUntilWithTimeout)(dispatch, resolve => ({
      predicate: ({
        type
      }) => type === MEDIA_LOAD_SUCCESS || type === MEDIA_LOAD_FAILURE,
      run: () => resolve()
    }));
  }
}

async function getMediaDisplayURL(dispatch, state, file) {
  const displayURLState = (0, _mediaLibrary.selectMediaDisplayURL)(state, file.id);
  let url;

  if (displayURLState.get('url')) {
    // url was already loaded
    url = displayURLState.get('url');
  } else if (displayURLState.get('err')) {
    // url loading had an error
    url = null;
  } else {
    const key = file.id;
    const promise = (0, _waitUntil.waitUntilWithTimeout)(dispatch, resolve => ({
      predicate: ({
        type,
        payload
      }) => (type === MEDIA_DISPLAY_URL_SUCCESS || type === MEDIA_DISPLAY_URL_FAILURE) && payload.key === key,
      run: (_dispatch, _getState, action) => resolve(action.payload.url)
    }));

    if (!displayURLState.get('isFetching')) {
      // load display url
      dispatch(loadMediaDisplayURL(file));
    }

    url = await promise;
  }

  return url;
}