"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectMediaFiles = selectMediaFiles;
exports.selectMediaFileByPath = selectMediaFileByPath;
exports.selectMediaDisplayURL = selectMediaDisplayURL;
exports.default = void 0;

var _immutable = require("immutable");

var _v = _interopRequireDefault(require("uuid/v4"));

var _mediaLibrary = require("../actions/mediaLibrary");

var _entries = require("./entries");

var _ = require("./");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultState = {
  isVisible: false,
  showMediaButton: true,
  controlMedia: (0, _immutable.Map)(),
  displayURLs: (0, _immutable.Map)(),
  config: (0, _immutable.Map)()
};

const mediaLibrary = (state = (0, _immutable.Map)(defaultState), action) => {
  switch (action.type) {
    case _mediaLibrary.MEDIA_LIBRARY_CREATE:
      return state.withMutations(map => {
        map.set('externalLibrary', action.payload);
        map.set('showMediaButton', action.payload.enableStandalone());
      });

    case _mediaLibrary.MEDIA_LIBRARY_OPEN:
      {
        const {
          controlID,
          forImage,
          privateUpload,
          config,
          field
        } = action.payload;
        const libConfig = config || (0, _immutable.Map)();
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return (0, _immutable.Map)({
            isVisible: true,
            forImage,
            controlID,
            canInsert: !!controlID,
            privateUpload,
            config: libConfig,
            controlMedia: (0, _immutable.Map)(),
            field
          });
        }

        return state.withMutations(map => {
          map.set('isVisible', true);
          map.set('forImage', forImage);
          map.set('controlID', controlID);
          map.set('canInsert', !!controlID);
          map.set('privateUpload', privateUpload);
          map.set('config', libConfig);
          map.set('field', field);
        });
      }

    case _mediaLibrary.MEDIA_LIBRARY_CLOSE:
      return state.set('isVisible', false);

    case _mediaLibrary.MEDIA_INSERT:
      {
        const {
          mediaPath
        } = action.payload;
        const controlID = state.get('controlID');
        return state.withMutations(map => {
          map.setIn(['controlMedia', controlID], mediaPath);
        });
      }

    case _mediaLibrary.MEDIA_REMOVE_INSERTED:
      {
        const controlID = action.payload.controlID;
        return state.setIn(['controlMedia', controlID], '');
      }

    case _mediaLibrary.MEDIA_LOAD_REQUEST:
      return state.withMutations(map => {
        map.set('isLoading', true);
        map.set('isPaginating', action.payload.page > 1);
      });

    case _mediaLibrary.MEDIA_LOAD_SUCCESS:
      {
        const {
          files = [],
          page,
          canPaginate,
          dynamicSearch,
          dynamicSearchQuery,
          privateUpload
        } = action.payload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        const filesWithKeys = files.map(file => _objectSpread({}, file, {
          key: (0, _v.default)()
        }));
        return state.withMutations(map => {
          map.set('isLoading', false);
          map.set('isPaginating', false);
          map.set('page', page);
          map.set('hasNextPage', canPaginate && files.length > 0);
          map.set('dynamicSearch', dynamicSearch);
          map.set('dynamicSearchQuery', dynamicSearchQuery);
          map.set('dynamicSearchActive', !!dynamicSearchQuery);

          if (page && page > 1) {
            const updatedFiles = map.get('files').concat(filesWithKeys);
            map.set('files', updatedFiles);
          } else {
            map.set('files', filesWithKeys);
          }
        });
      }

    case _mediaLibrary.MEDIA_LOAD_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isLoading', false);
      }

    case _mediaLibrary.MEDIA_PERSIST_REQUEST:
      return state.set('isPersisting', true);

    case _mediaLibrary.MEDIA_PERSIST_SUCCESS:
      {
        const {
          file,
          privateUpload
        } = action.payload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.withMutations(map => {
          const fileWithKey = _objectSpread({}, file, {
            key: (0, _v.default)()
          });

          const files = map.get('files');
          const updatedFiles = [fileWithKey, ...files];
          map.set('files', updatedFiles);
          map.set('isPersisting', false);
        });
      }

    case _mediaLibrary.MEDIA_PERSIST_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isPersisting', false);
      }

    case _mediaLibrary.MEDIA_DELETE_REQUEST:
      return state.set('isDeleting', true);

    case _mediaLibrary.MEDIA_DELETE_SUCCESS:
      {
        const {
          id,
          key,
          privateUpload
        } = action.payload.file;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.withMutations(map => {
          const files = map.get('files');
          const updatedFiles = files.filter(file => key ? file.key !== key : file.id !== id);
          map.set('files', updatedFiles);
          map.deleteIn(['displayURLs', id]);
          map.set('isDeleting', false);
        });
      }

    case _mediaLibrary.MEDIA_DELETE_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isDeleting', false);
      }

    case _mediaLibrary.MEDIA_DISPLAY_URL_REQUEST:
      return state.setIn(['displayURLs', action.payload.key, 'isFetching'], true);

    case _mediaLibrary.MEDIA_DISPLAY_URL_SUCCESS:
      {
        const displayURLPath = ['displayURLs', action.payload.key];
        return state.setIn([...displayURLPath, 'isFetching'], false).setIn([...displayURLPath, 'url'], action.payload.url);
      }

    case _mediaLibrary.MEDIA_DISPLAY_URL_FAILURE:
      {
        const displayURLPath = ['displayURLs', action.payload.key];
        return state.setIn([...displayURLPath, 'isFetching'], false) // make sure that err is set so the CMS won't attempt to load
        // the image again
        .setIn([...displayURLPath, 'err'], action.payload.err || true).deleteIn([...displayURLPath, 'url']);
      }

    default:
      return state;
  }
};

function selectMediaFiles(state, field) {
  const {
    mediaLibrary,
    entryDraft
  } = state;
  const editingDraft = (0, _entries.selectEditingDraft)(state.entryDraft);
  const integration = (0, _.selectIntegration)(state, null, 'assetStore');
  let files;

  if (editingDraft && !integration) {
    const entryFiles = entryDraft.getIn(['entry', 'mediaFiles'], (0, _immutable.List)()).toJS();
    const entry = entryDraft.get('entry');
    const collection = state.collections.get(entry === null || entry === void 0 ? void 0 : entry.get('collection'));
    const mediaFolder = (0, _entries.selectMediaFolder)(state.config, collection, entry, field);
    files = entryFiles.filter(f => (0, _path.dirname)(f.path) === mediaFolder).map(file => _objectSpread({
      key: file.id
    }, file));
  } else {
    files = mediaLibrary.get('files') || [];
  }

  return files;
}

function selectMediaFileByPath(state, path) {
  const files = selectMediaFiles(state);
  const file = files.find(file => file.path === path);
  return file;
}

function selectMediaDisplayURL(state, id) {
  const displayUrlState = state.mediaLibrary.getIn(['displayURLs', id], (0, _immutable.Map)());
  return displayUrlState;
}

var _default = mediaLibrary;
exports.default = _default;