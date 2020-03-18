"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectEditingDraft = exports.selectMediaFilePublicPath = exports.selectMediaFilePath = exports.selectMediaFolder = exports.selectEntries = exports.selectPublishedSlugs = exports.selectEntry = void 0;

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _immutable = require("immutable");

var _path = require("path");

var _entries = require("../actions/entries");

var _search = require("../actions/search");

var _formatters = require("../lib/formatters");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let collection;
let loadedEntries;
let append;
let page;
let slug;

const entries = (state = (0, _immutable.Map)({
  entities: (0, _immutable.Map)(),
  pages: (0, _immutable.Map)()
}), action) => {
  switch (action.type) {
    case _entries.ENTRY_REQUEST:
      {
        const payload = action.payload;
        return state.setIn(['entities', "".concat(payload.collection, ".").concat(payload.slug), 'isFetching'], true);
      }

    case _entries.ENTRY_SUCCESS:
      {
        const payload = action.payload;
        collection = payload.collection;
        slug = payload.entry.slug;
        return state.withMutations(map => {
          map.setIn(['entities', "".concat(collection, ".").concat(slug)], (0, _immutable.fromJS)(payload.entry));
          const ids = map.getIn(['pages', collection, 'ids'], (0, _immutable.List)());

          if (!ids.includes(slug)) {
            map.setIn(['pages', collection, 'ids'], ids.unshift(slug));
          }
        });
      }

    case _entries.ENTRIES_REQUEST:
      {
        const payload = action.payload;
        return state.setIn(['pages', payload.collection, 'isFetching'], true);
      }

    case _entries.ENTRIES_SUCCESS:
      {
        const payload = action.payload;
        collection = payload.collection;
        loadedEntries = payload.entries;
        append = payload.append;
        page = payload.page;
        return state.withMutations(map => {
          loadedEntries.forEach(entry => map.setIn(['entities', "".concat(collection, ".").concat(entry.slug)], (0, _immutable.fromJS)(entry).set('isFetching', false)));
          const ids = (0, _immutable.List)(loadedEntries.map(entry => entry.slug));
          map.setIn(['pages', collection], (0, _immutable.Map)({
            page,
            ids: append ? map.getIn(['pages', collection, 'ids'], (0, _immutable.List)()).concat(ids) : ids
          }));
        });
      }

    case _entries.ENTRIES_FAILURE:
      return state.setIn(['pages', action.meta.collection, 'isFetching'], false);

    case _entries.ENTRY_FAILURE:
      {
        const payload = action.payload;
        return state.withMutations(map => {
          map.setIn(['entities', "".concat(payload.collection, ".").concat(payload.slug), 'isFetching'], false);
          map.setIn(['entities', "".concat(payload.collection, ".").concat(payload.slug), 'error'], payload.error.message);
        });
      }

    case _search.SEARCH_ENTRIES_SUCCESS:
      {
        const payload = action.payload;
        loadedEntries = payload.entries;
        return state.withMutations(map => {
          loadedEntries.forEach(entry => map.setIn(['entities', "".concat(entry.collection, ".").concat(entry.slug)], (0, _immutable.fromJS)(entry).set('isFetching', false)));
        });
      }

    case _entries.ENTRY_DELETE_SUCCESS:
      {
        const payload = action.payload;
        return state.withMutations(map => {
          map.deleteIn(['entities', "".concat(payload.collectionName, ".").concat(payload.entrySlug)]);
          map.updateIn(['pages', payload.collectionName, 'ids'], ids => ids.filter(id => id !== payload.entrySlug));
        });
      }

    default:
      return state;
  }
};

const selectEntry = (state, collection, slug) => state.getIn(['entities', "".concat(collection, ".").concat(slug)]);

exports.selectEntry = selectEntry;

const selectPublishedSlugs = (state, collection) => state.getIn(['pages', collection, 'ids'], (0, _immutable.List)());

exports.selectPublishedSlugs = selectPublishedSlugs;

const selectEntries = (state, collection) => {
  const slugs = selectPublishedSlugs(state, collection);
  return slugs && slugs.map(slug => selectEntry(state, collection, slug));
};

exports.selectEntries = selectEntries;
const DRAFT_MEDIA_FILES = 'DRAFT_MEDIA_FILES';

const getFileField = (collectionFiles, slug) => {
  const file = collectionFiles.find(f => (f === null || f === void 0 ? void 0 : f.get('name')) === slug);
  return file;
};

const hasCustomFolder = (folderKey, collection, slug, field) => {
  if (!collection) {
    return false;
  }

  if (field && field.has(folderKey)) {
    return true;
  }

  if (collection.has('files')) {
    const file = getFileField(collection.get('files'), slug);

    if (file && file.has(folderKey)) {
      return true;
    }
  }

  if (collection.has(folderKey)) {
    return true;
  }

  return false;
};

const traverseFields = (folderKey, config, collection, entryMap, field, fields, currentFolder) => {
  const matchedField = fields.filter(f => f === field)[0];

  if (matchedField) {
    return (0, _formatters.folderFormatter)(matchedField.has(folderKey) ? matchedField.get(folderKey) : "{{".concat(folderKey, "}}"), entryMap, collection, currentFolder, folderKey, config.get('slug'));
  }

  for (let f of fields) {
    if (!f.has(folderKey)) {
      // add identity template if doesn't exist
      f = f.set(folderKey, "{{".concat(folderKey, "}}"));
    }

    const folder = (0, _formatters.folderFormatter)(f.get(folderKey), entryMap, collection, currentFolder, folderKey, config.get('slug'));
    let fieldFolder = null;

    if (f.has('fields')) {
      fieldFolder = traverseFields(folderKey, config, collection, entryMap, field, f.get('fields').toArray(), folder);
    } else if (f.has('field')) {
      fieldFolder = traverseFields(folderKey, config, collection, entryMap, field, [f.get('field')], folder);
    } else if (f.has('types')) {
      fieldFolder = traverseFields(folderKey, config, collection, entryMap, field, f.get('types').toArray(), folder);
    }

    if (fieldFolder != null) {
      return fieldFolder;
    }
  }

  return null;
};

const evaluateFolder = (folderKey, config, collection, entryMap, field) => {
  let currentFolder = config.get(folderKey); // add identity template if doesn't exist

  if (!collection.has(folderKey)) {
    collection = collection.set(folderKey, "{{".concat(folderKey, "}}"));
  }

  if (collection.has('files')) {
    // files collection evaluate the collection template
    // then move on to the specific file configuration denoted by the slug
    currentFolder = (0, _formatters.folderFormatter)(collection.get(folderKey), entryMap, collection, currentFolder, folderKey, config.get('slug'));
    let file = getFileField(collection.get('files'), entryMap === null || entryMap === void 0 ? void 0 : entryMap.get('slug'));

    if (file) {
      if (!file.has(folderKey)) {
        // add identity template if doesn't exist
        file = file.set(folderKey, "{{".concat(folderKey, "}}"));
      } // evaluate the file template and keep evaluating until we match our field


      currentFolder = (0, _formatters.folderFormatter)(file.get(folderKey), entryMap, collection, currentFolder, folderKey, config.get('slug'));

      if (field) {
        const fieldFolder = traverseFields(folderKey, config, collection, entryMap, field, file.get('fields').toArray(), currentFolder);

        if (fieldFolder !== null) {
          currentFolder = fieldFolder;
        }
      }
    }
  } else {
    // folder collection, evaluate the collection template
    // and keep evaluating until we match our field
    currentFolder = (0, _formatters.folderFormatter)(collection.get(folderKey), entryMap, collection, currentFolder, folderKey, config.get('slug'));

    if (field) {
      const fieldFolder = traverseFields(folderKey, config, collection, entryMap, field, collection.get('fields').toArray(), currentFolder);

      if (fieldFolder !== null) {
        currentFolder = fieldFolder;
      }
    }
  }

  return currentFolder;
};

const selectMediaFolder = (config, collection, entryMap, field) => {
  const name = 'media_folder';
  let mediaFolder = config.get(name);
  const customFolder = hasCustomFolder(name, collection, entryMap === null || entryMap === void 0 ? void 0 : entryMap.get('slug'), field);

  if (customFolder) {
    const entryPath = entryMap === null || entryMap === void 0 ? void 0 : entryMap.get('path');

    if (entryPath) {
      const entryDir = (0, _path.dirname)(entryPath);
      const folder = evaluateFolder(name, config, collection, entryMap, field); // return absolute paths as is

      if (folder.startsWith('/')) {
        mediaFolder = (0, _path.join)(folder);
      } else {
        mediaFolder = (0, _path.join)(entryDir, folder);
      }
    } else {
      mediaFolder = (0, _path.join)(collection.get('folder'), DRAFT_MEDIA_FILES);
    }
  }

  return (0, _trim2.default)(mediaFolder, '/');
};

exports.selectMediaFolder = selectMediaFolder;

const selectMediaFilePath = (config, collection, entryMap, mediaPath, field) => {
  if ((0, _netlifyCmsLibUtil.isAbsolutePath)(mediaPath)) {
    return mediaPath;
  }

  const mediaFolder = selectMediaFolder(config, collection, entryMap, field);
  return (0, _path.join)(mediaFolder, (0, _netlifyCmsLibUtil.basename)(mediaPath));
};

exports.selectMediaFilePath = selectMediaFilePath;

const selectMediaFilePublicPath = (config, collection, mediaPath, entryMap, field) => {
  if ((0, _netlifyCmsLibUtil.isAbsolutePath)(mediaPath)) {
    return mediaPath;
  }

  const name = 'public_folder';
  let publicFolder = config.get(name);
  const customFolder = hasCustomFolder(name, collection, entryMap === null || entryMap === void 0 ? void 0 : entryMap.get('slug'), field);

  if (customFolder) {
    publicFolder = evaluateFolder(name, config, collection, entryMap, field);
  }

  return (0, _path.join)(publicFolder, (0, _netlifyCmsLibUtil.basename)(mediaPath));
};

exports.selectMediaFilePublicPath = selectMediaFilePublicPath;

const selectEditingDraft = state => {
  const entry = state.get('entry');
  const workflowDraft = entry && !entry.isEmpty();
  return workflowDraft;
};

exports.selectEditingDraft = selectEditingDraft;
var _default = entries;
exports.default = _default;