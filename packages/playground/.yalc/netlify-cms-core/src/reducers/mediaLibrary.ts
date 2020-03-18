import { Map, List } from 'immutable';
import uuid from 'uuid/v4';
import {
  MEDIA_LIBRARY_OPEN,
  MEDIA_LIBRARY_CLOSE,
  MEDIA_LIBRARY_CREATE,
  MEDIA_INSERT,
  MEDIA_REMOVE_INSERTED,
  MEDIA_LOAD_REQUEST,
  MEDIA_LOAD_SUCCESS,
  MEDIA_LOAD_FAILURE,
  MEDIA_PERSIST_REQUEST,
  MEDIA_PERSIST_SUCCESS,
  MEDIA_PERSIST_FAILURE,
  MEDIA_DELETE_REQUEST,
  MEDIA_DELETE_SUCCESS,
  MEDIA_DELETE_FAILURE,
  MEDIA_DISPLAY_URL_REQUEST,
  MEDIA_DISPLAY_URL_SUCCESS,
  MEDIA_DISPLAY_URL_FAILURE,
} from '../actions/mediaLibrary';
import { selectEditingDraft, selectMediaFolder } from './entries';
import { selectIntegration } from './';
import {
  State,
  MediaLibraryAction,
  MediaLibraryInstance,
  MediaFile,
  MediaFileMap,
  DisplayURLState,
  EntryField,
} from '../types/redux';
import { dirname } from 'path';

const defaultState: {
  isVisible: boolean;
  showMediaButton: boolean;
  controlMedia: Map<string, string>;
  displayURLs: Map<string, string>;
  externalLibrary?: MediaLibraryInstance;
  controlID?: string;
  page?: number;
  files?: MediaFile[];
  config: Map<string, string>;
  field?: EntryField;
} = {
  isVisible: false,
  showMediaButton: true,
  controlMedia: Map(),
  displayURLs: Map(),
  config: Map(),
};

const mediaLibrary = (state = Map(defaultState), action: MediaLibraryAction) => {
  switch (action.type) {
    case MEDIA_LIBRARY_CREATE:
      return state.withMutations(map => {
        map.set('externalLibrary', action.payload);
        map.set('showMediaButton', action.payload.enableStandalone());
      });
    case MEDIA_LIBRARY_OPEN: {
      const { controlID, forImage, privateUpload, config, field } = action.payload;
      const libConfig = config || Map();
      const privateUploadChanged = state.get('privateUpload') !== privateUpload;
      if (privateUploadChanged) {
        return Map({
          isVisible: true,
          forImage,
          controlID,
          canInsert: !!controlID,
          privateUpload,
          config: libConfig,
          controlMedia: Map(),
          field,
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
    case MEDIA_LIBRARY_CLOSE:
      return state.set('isVisible', false);
    case MEDIA_INSERT: {
      const { mediaPath } = action.payload;
      const controlID = state.get('controlID');
      return state.withMutations(map => {
        map.setIn(['controlMedia', controlID], mediaPath);
      });
    }
    case MEDIA_REMOVE_INSERTED: {
      const controlID = action.payload.controlID;
      return state.setIn(['controlMedia', controlID], '');
    }
    case MEDIA_LOAD_REQUEST:
      return state.withMutations(map => {
        map.set('isLoading', true);
        map.set('isPaginating', action.payload.page > 1);
      });
    case MEDIA_LOAD_SUCCESS: {
      const {
        files = [],
        page,
        canPaginate,
        dynamicSearch,
        dynamicSearchQuery,
        privateUpload,
      } = action.payload;
      const privateUploadChanged = state.get('privateUpload') !== privateUpload;

      if (privateUploadChanged) {
        return state;
      }

      const filesWithKeys = files.map(file => ({ ...file, key: uuid() }));
      return state.withMutations(map => {
        map.set('isLoading', false);
        map.set('isPaginating', false);
        map.set('page', page);
        map.set('hasNextPage', canPaginate && files.length > 0);
        map.set('dynamicSearch', dynamicSearch);
        map.set('dynamicSearchQuery', dynamicSearchQuery);
        map.set('dynamicSearchActive', !!dynamicSearchQuery);
        if (page && page > 1) {
          const updatedFiles = (map.get('files') as MediaFile[]).concat(filesWithKeys);
          map.set('files', updatedFiles);
        } else {
          map.set('files', filesWithKeys);
        }
      });
    }
    case MEDIA_LOAD_FAILURE: {
      const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;
      if (privateUploadChanged) {
        return state;
      }
      return state.set('isLoading', false);
    }
    case MEDIA_PERSIST_REQUEST:
      return state.set('isPersisting', true);
    case MEDIA_PERSIST_SUCCESS: {
      const { file, privateUpload } = action.payload;
      const privateUploadChanged = state.get('privateUpload') !== privateUpload;
      if (privateUploadChanged) {
        return state;
      }
      return state.withMutations(map => {
        const fileWithKey = { ...file, key: uuid() };
        const files = map.get('files') as MediaFile[];
        const updatedFiles = [fileWithKey, ...files];
        map.set('files', updatedFiles);
        map.set('isPersisting', false);
      });
    }
    case MEDIA_PERSIST_FAILURE: {
      const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;
      if (privateUploadChanged) {
        return state;
      }
      return state.set('isPersisting', false);
    }
    case MEDIA_DELETE_REQUEST:
      return state.set('isDeleting', true);
    case MEDIA_DELETE_SUCCESS: {
      const { id, key, privateUpload } = action.payload.file;
      const privateUploadChanged = state.get('privateUpload') !== privateUpload;
      if (privateUploadChanged) {
        return state;
      }
      return state.withMutations(map => {
        const files = map.get('files') as MediaFile[];
        const updatedFiles = files.filter(file => (key ? file.key !== key : file.id !== id));
        map.set('files', updatedFiles);
        map.deleteIn(['displayURLs', id]);
        map.set('isDeleting', false);
      });
    }
    case MEDIA_DELETE_FAILURE: {
      const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;
      if (privateUploadChanged) {
        return state;
      }
      return state.set('isDeleting', false);
    }

    case MEDIA_DISPLAY_URL_REQUEST:
      return state.setIn(['displayURLs', action.payload.key, 'isFetching'], true);

    case MEDIA_DISPLAY_URL_SUCCESS: {
      const displayURLPath = ['displayURLs', action.payload.key];
      return state
        .setIn([...displayURLPath, 'isFetching'], false)
        .setIn([...displayURLPath, 'url'], action.payload.url);
    }

    case MEDIA_DISPLAY_URL_FAILURE: {
      const displayURLPath = ['displayURLs', action.payload.key];
      return (
        state
          .setIn([...displayURLPath, 'isFetching'], false)
          // make sure that err is set so the CMS won't attempt to load
          // the image again
          .setIn([...displayURLPath, 'err'], action.payload.err || true)
          .deleteIn([...displayURLPath, 'url'])
      );
    }
    default:
      return state;
  }
};

export function selectMediaFiles(state: State, field?: EntryField) {
  const { mediaLibrary, entryDraft } = state;
  const editingDraft = selectEditingDraft(state.entryDraft);
  const integration = selectIntegration(state, null, 'assetStore');

  let files;
  if (editingDraft && !integration) {
    const entryFiles = entryDraft
      .getIn(['entry', 'mediaFiles'], List<MediaFileMap>())
      .toJS() as MediaFile[];
    const entry = entryDraft.get('entry');
    const collection = state.collections.get(entry?.get('collection'));
    const mediaFolder = selectMediaFolder(state.config, collection, entry, field);
    files = entryFiles
      .filter(f => dirname(f.path) === mediaFolder)
      .map(file => ({ key: file.id, ...file }));
  } else {
    files = mediaLibrary.get('files') || [];
  }

  return files;
}

export function selectMediaFileByPath(state: State, path: string) {
  const files = selectMediaFiles(state);
  const file = files.find(file => file.path === path);
  return file;
}

export function selectMediaDisplayURL(state: State, id: string) {
  const displayUrlState = state.mediaLibrary.getIn(
    ['displayURLs', id],
    (Map() as unknown) as DisplayURLState,
  );
  return displayUrlState;
}

export default mediaLibrary;
