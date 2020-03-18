"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveBackend = resolveBackend;
exports.currentBackend = exports.Backend = exports.LocalStorageAuthStore = void 0;

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _isError2 = _interopRequireDefault(require("lodash/isError"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _attempt2 = _interopRequireDefault(require("lodash/attempt"));

var _immutable = require("immutable");

var fuzzy = _interopRequireWildcard(require("fuzzy"));

var _formats = require("./formats/formats");

var _config = require("./reducers/config");

var _entries = require("./reducers/entries");

var _integrations = require("./reducers/integrations");

var _collections = require("./reducers/collections");

var _Entry = require("./valueObjects/Entry");

var _urlHelper = require("./lib/urlHelper");

var _registry = require("./lib/registry");

var _formatters = require("./lib/formatters");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _publishModes = require("./constants/publishModes");

var _stringTemplate = require("./lib/stringTemplate");

var _collectionTypes = require("./constants/collectionTypes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LocalStorageAuthStore {
  constructor() {
    _defineProperty(this, "storageKey", 'netlify-cms-user');
  }

  retrieve() {
    const data = window.localStorage.getItem(this.storageKey);
    return data && JSON.parse(data);
  }

  store(userData) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  logout() {
    window.localStorage.removeItem(this.storageKey);
  }

}

exports.LocalStorageAuthStore = LocalStorageAuthStore;

function getEntryBackupKey(collectionName, slug) {
  const baseKey = 'backup';

  if (!collectionName) {
    return baseKey;
  }

  const suffix = slug ? ".".concat(slug) : '';
  return "".concat(baseKey, ".").concat(collectionName).concat(suffix);
}

const extractSearchFields = searchFields => entry => searchFields.reduce((acc, field) => {
  const nestedFields = field.split('.');
  let f = entry.data;

  for (let i = 0; i < nestedFields.length; i++) {
    f = f[nestedFields[i]];
    if (!f) break;
  }

  return f ? "".concat(acc, " ").concat(f) : acc;
}, '');

const sortByScore = (a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
};

class Backend {
  constructor(implementation, {
    backendName,
    authStore = null,
    config
  } = {}) {
    _defineProperty(this, "implementation", void 0);

    _defineProperty(this, "backendName", void 0);

    _defineProperty(this, "authStore", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "user", void 0);

    _defineProperty(this, "updateUserCredentials", updatedCredentials => {
      const storedUser = this.authStore.retrieve();

      if (storedUser && storedUser.backendName === this.backendName) {
        this.user = _objectSpread({}, storedUser, {}, updatedCredentials);
        this.authStore.store(this.user);
        return this.user;
      }
    });

    _defineProperty(this, "getToken", () => this.implementation.getToken());

    // We can't reliably run this on exit, so we do cleanup on load.
    this.deleteAnonymousBackup();
    this.config = config;
    this.implementation = implementation.init(this.config.toJS(), {
      useWorkflow: (0, _config.selectUseWorkflow)(this.config),
      updateUserCredentials: this.updateUserCredentials,
      initialWorkflowStatus: _publishModes.status.first()
    });
    this.backendName = backendName;
    this.authStore = authStore;

    if (this.implementation === null) {
      throw new Error('Cannot instantiate a Backend with no implementation');
    }
  }

  currentUser() {
    if (this.user) {
      return this.user;
    }

    const stored = this.authStore.retrieve();

    if (stored && stored.backendName === this.backendName) {
      return Promise.resolve(this.implementation.restoreUser(stored)).then(user => {
        this.user = _objectSpread({}, user, {
          backendName: this.backendName
        }); // return confirmed/rehydrated user object instead of stored

        this.authStore.store(this.user);
        return this.user;
      });
    }

    return Promise.resolve(null);
  }

  authComponent() {
    return this.implementation.authComponent();
  }

  authenticate(credentials) {
    return this.implementation.authenticate(credentials).then(user => {
      this.user = _objectSpread({}, user, {
        backendName: this.backendName
      });

      if (this.authStore) {
        this.authStore.store(this.user);
      }

      return this.user;
    });
  }

  logout() {
    return Promise.resolve(this.implementation.logout()).then(() => {
      this.user = null;

      if (this.authStore) {
        this.authStore.logout();
      }
    });
  }

  async entryExist(collection, path, slug, useWorkflow) {
    const unpublishedEntry = useWorkflow && (await this.implementation.unpublishedEntry(collection.get('name'), slug).catch(error => {
      if (error instanceof _netlifyCmsLibUtil.EditorialWorkflowError && error.notUnderEditorialWorkflow) {
        return Promise.resolve(false);
      }

      return Promise.reject(error);
    }));
    if (unpublishedEntry) return unpublishedEntry;
    const publishedEntry = await this.implementation.getEntry(path).then(({
      data
    }) => data).catch(() => {
      return Promise.resolve(false);
    });
    return publishedEntry;
  }

  async generateUniqueSlug(collection, entryData, config, usedSlugs) {
    const slugConfig = config.get('slug');
    const slug = (0, _formatters.slugFormatter)(collection, entryData, slugConfig);
    let i = 1;
    let uniqueSlug = slug; // Check for duplicate slug in loaded entities store first before repo

    while (usedSlugs.includes(uniqueSlug) || (await this.entryExist(collection, (0, _collections.selectEntryPath)(collection, uniqueSlug), uniqueSlug, (0, _config.selectUseWorkflow)(config)))) {
      uniqueSlug = "".concat(slug).concat((0, _urlHelper.sanitizeChar)(' ', slugConfig)).concat(i++);
    }

    return uniqueSlug;
  }

  processEntries(loadedEntries, collection) {
    const collectionFilter = collection.get('filter');
    const entries = loadedEntries.map(loadedEntry => (0, _Entry.createEntry)(collection.get('name'), (0, _collections.selectEntrySlug)(collection, loadedEntry.file.path), loadedEntry.file.path, {
      raw: loadedEntry.data || '',
      label: loadedEntry.file.label
    }));
    const formattedEntries = entries.map(this.entryWithFormat(collection)); // If this collection has a "filter" property, filter entries accordingly

    const filteredEntries = collectionFilter ? this.filterEntries({
      entries: formattedEntries
    }, collectionFilter) : formattedEntries;
    return filteredEntries;
  }

  listEntries(collection) {
    const extension = (0, _collections.selectFolderEntryExtension)(collection);
    let listMethod;
    const collectionType = collection.get('type');

    if (collectionType === _collectionTypes.FOLDER) {
      listMethod = () => this.implementation.entriesByFolder(collection.get('folder'), extension, (0, _netlifyCmsLibUtil.getPathDepth)(collection.get('path', '')));
    } else if (collectionType === _collectionTypes.FILES) {
      const files = collection.get('files').map(collectionFile => ({
        path: collectionFile.get('file'),
        label: collectionFile.get('label')
      })).toArray();

      listMethod = () => this.implementation.entriesByFiles(files);
    } else {
      throw new Error("Unknown collection type: ".concat(collectionType));
    }

    return listMethod().then(loadedEntries => ({
      entries: this.processEntries(loadedEntries, collection),

      /*
          Wrap cursors so we can tell which collection the cursor is
          from. This is done to prevent traverseCursor from requiring a
          `collection` argument.
        */
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      cursor: _netlifyCmsLibUtil.Cursor.create(loadedEntries[_netlifyCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL]).wrapData({
        cursorType: 'collectionEntries',
        collection
      })
    }));
  } // The same as listEntries, except that if a cursor with the "next"
  // action available is returned, it calls "next" on the cursor and
  // repeats the process. Once there is no available "next" action, it
  // returns all the collected entries. Used to retrieve all entries
  // for local searches and queries.


  async listAllEntries(collection) {
    if (collection.get('folder') && this.implementation.allEntriesByFolder) {
      const extension = (0, _collections.selectFolderEntryExtension)(collection);
      return this.implementation.allEntriesByFolder(collection.get('folder'), extension, (0, _netlifyCmsLibUtil.getPathDepth)(collection.get('path', ''))).then(entries => this.processEntries(entries, collection));
    }

    const response = await this.listEntries(collection);
    const {
      entries
    } = response;
    let {
      cursor
    } = response;

    while (cursor && cursor.actions.includes('next')) {
      const {
        entries: newEntries,
        cursor: newCursor
      } = await this.traverseCursor(cursor, 'next');
      entries.push(...newEntries);
      cursor = newCursor;
    }

    return entries;
  }

  async search(collections, searchTerm) {
    // Perform a local search by requesting all entries. For each
    // collection, load it, search, and call onCollectionResults with
    // its results.
    const errors = [];
    const collectionEntriesRequests = collections.map(async collection => {
      const summary = collection.get('summary', '');
      const summaryFields = (0, _stringTemplate.extractTemplateVars)(summary); // TODO: pass search fields in as an argument

      const searchFields = [(0, _collections.selectInferedField)(collection, 'title'), (0, _collections.selectInferedField)(collection, 'shortTitle'), (0, _collections.selectInferedField)(collection, 'author'), ...summaryFields.map(elem => {
        if (_stringTemplate.dateParsers[elem]) {
          return (0, _collections.selectInferedField)(collection, 'date');
        }

        return elem;
      })].filter(Boolean);
      const collectionEntries = await this.listAllEntries(collection);
      return fuzzy.filter(searchTerm, collectionEntries, {
        extract: extractSearchFields((0, _uniq2.default)(searchFields))
      });
    }).map(p => p.catch(err => {
      errors.push(err);
      return [];
    }));
    const entries = await Promise.all(collectionEntriesRequests).then(arrays => (0, _flatten2.default)(arrays));

    if (errors.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      throw new Error({
        message: 'Errors ocurred while searching entries locally!',
        errors
      });
    }

    const hits = entries.filter(({
      score
    }) => score > 5).sort(sortByScore).map(f => f.original);
    return {
      entries: hits
    };
  }

  async query(collection, searchFields, searchTerm) {
    const entries = await this.listAllEntries(collection);
    const hits = fuzzy.filter(searchTerm, entries, {
      extract: extractSearchFields(searchFields)
    }).sort(sortByScore).map(f => f.original);
    return {
      query: searchTerm,
      hits
    };
  }

  traverseCursor(cursor, action) {
    const [data, unwrappedCursor] = cursor.unwrapData(); // TODO: stop assuming all cursors are for collections

    const collection = data.get('collection');
    return this.implementation.traverseCursor(unwrappedCursor, action).then(async ({
      entries,
      cursor: newCursor
    }) => ({
      entries: this.processEntries(entries, collection),
      cursor: _netlifyCmsLibUtil.Cursor.create(newCursor).wrapData({
        cursorType: 'collectionEntries',
        collection
      })
    }));
  }

  async getLocalDraftBackup(collection, slug) {
    const key = getEntryBackupKey(collection.get('name'), slug);
    const backup = await _netlifyCmsLibUtil.localForage.getItem(key);

    if (!backup || !backup.raw.trim()) {
      return {};
    }

    const {
      raw,
      path
    } = backup;
    let {
      mediaFiles = []
    } = backup;
    mediaFiles = mediaFiles.map(file => {
      // de-serialize the file object
      if (file.file) {
        return _objectSpread({}, file, {
          url: URL.createObjectURL(file.file)
        });
      }

      return file;
    });
    const label = (0, _collections.selectFileEntryLabel)(collection, slug);
    const entry = this.entryWithFormat(collection)((0, _Entry.createEntry)(collection.get('name'), slug, path, {
      raw,
      label,
      mediaFiles
    }));
    return {
      entry
    };
  }

  async persistLocalDraftBackup(entry, collection) {
    const key = getEntryBackupKey(collection.get('name'), entry.get('slug'));
    const raw = this.entryToRaw(collection, entry);

    if (!raw.trim()) {
      return;
    }

    const mediaFiles = await Promise.all(entry.get('mediaFiles').toJS().map(async file => {
      var _file$url;

      // make sure to serialize the file
      if ((_file$url = file.url) === null || _file$url === void 0 ? void 0 : _file$url.startsWith('blob:')) {
        const blob = await fetch(file.url).then(res => res.blob());
        return _objectSpread({}, file, {
          file: (0, _netlifyCmsLibUtil.blobToFileObj)(file.name, blob)
        });
      }

      return file;
    }));
    await _netlifyCmsLibUtil.localForage.setItem(key, {
      raw,
      path: entry.get('path'),
      mediaFiles
    });
    return _netlifyCmsLibUtil.localForage.setItem(getEntryBackupKey(), raw);
  }

  async deleteLocalDraftBackup(collection, slug) {
    const key = getEntryBackupKey(collection.get('name'), slug);
    await _netlifyCmsLibUtil.localForage.removeItem(key);
    return this.deleteAnonymousBackup();
  } // Unnamed backup for use in the global error boundary, should always be
  // deleted on cms load.


  deleteAnonymousBackup() {
    return _netlifyCmsLibUtil.localForage.removeItem(getEntryBackupKey());
  }

  async getEntry(state, collection, slug) {
    const path = (0, _collections.selectEntryPath)(collection, slug);
    const label = (0, _collections.selectFileEntryLabel)(collection, slug);
    const integration = (0, _integrations.selectIntegration)(state.integrations, null, 'assetStore');
    const loadedEntry = await this.implementation.getEntry(path);
    const entry = (0, _Entry.createEntry)(collection.get('name'), slug, loadedEntry.file.path, {
      raw: loadedEntry.data,
      label,
      mediaFiles: []
    });
    const entryWithFormat = this.entryWithFormat(collection)(entry);
    const mediaFolders = (0, _collections.selectMediaFolders)(state, collection, (0, _immutable.fromJS)(entryWithFormat));

    if (mediaFolders.length > 0 && !integration) {
      entry.mediaFiles = [];

      for (const folder of mediaFolders) {
        entry.mediaFiles = [...entry.mediaFiles, ...(await this.implementation.getMedia(folder))];
      }
    } else {
      entry.mediaFiles = state.mediaLibrary.get('files') || [];
    }

    return entryWithFormat;
  }

  getMedia() {
    return this.implementation.getMedia();
  }

  getMediaFile(path) {
    return this.implementation.getMediaFile(path);
  }

  getMediaDisplayURL(displayURL) {
    if (this.implementation.getMediaDisplayURL) {
      return this.implementation.getMediaDisplayURL(displayURL);
    }

    const err = new Error('getMediaDisplayURL is not implemented by the current backend, but the backend returned a displayURL which was not a string!');
    err.displayURL = displayURL;
    return Promise.reject(err);
  }

  entryWithFormat(collectionOrEntity) {
    return entry => {
      const format = (0, _formats.resolveFormat)(collectionOrEntity, entry);

      if (entry && entry.raw !== undefined) {
        const data = format && (0, _attempt2.default)(format.fromFile.bind(format, entry.raw)) || {};
        if ((0, _isError2.default)(data)) console.error(data);
        return Object.assign(entry, {
          data: (0, _isError2.default)(data) ? {} : data
        });
      }

      return format.fromFile(entry);
    };
  }

  unpublishedEntries(collections) {
    return this.implementation.unpublishedEntries().then(entries => entries.map(loadedEntry => {
      const collectionName = loadedEntry.metaData.collection;
      const collection = collections.find(c => c.get('name') === collectionName);
      const entry = (0, _Entry.createEntry)(collectionName, loadedEntry.slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        isModification: loadedEntry.isModification,
        label: collection && (0, _collections.selectFileEntryLabel)(collection, loadedEntry.slug)
      });
      entry.metaData = loadedEntry.metaData;
      return entry;
    })).then(entries => ({
      pagination: 0,
      entries: entries.reduce((acc, entry) => {
        const collection = collections.get(entry.collection);

        if (collection) {
          acc.push(this.entryWithFormat(collection)(entry));
        } else {
          console.warn("Missing collection '".concat(entry.collection, "' for entry with path '").concat(entry.path, "'"));
        }

        return acc;
      }, [])
    }));
  }

  unpublishedEntry(collection, slug) {
    return this.implementation.unpublishedEntry(collection.get('name'), slug).then(loadedEntry => {
      const entry = (0, _Entry.createEntry)(collection.get('name'), loadedEntry.slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        isModification: loadedEntry.isModification,
        metaData: loadedEntry.metaData,
        mediaFiles: loadedEntry.mediaFiles
      });
      return entry;
    }).then(this.entryWithFormat(collection));
  }
  /**
   * Creates a URL using `site_url` from the config and `preview_path` from the
   * entry's collection. Does not currently make a request through the backend,
   * but likely will in the future.
   */


  getDeploy(collection, slug, entry) {
    /**
     * If `site_url` is undefined or `show_preview_links` in the config is set to false, do nothing.
     */
    const baseUrl = this.config.get('site_url');

    if (!baseUrl || this.config.get('show_preview_links') === false) {
      return;
    }

    return {
      url: (0, _formatters.previewUrlFormatter)(baseUrl, collection, slug, this.config.get('slug'), entry),
      status: 'SUCCESS'
    };
  }
  /**
   * Requests a base URL from the backend for previewing a specific entry.
   * Supports polling via `maxAttempts` and `interval` options, as there is
   * often a delay before a preview URL is available.
   */


  async getDeployPreview(collection, slug, entry, {
    maxAttempts = 1,
    interval = 5000
  } = {}) {
    /**
     * If the registered backend does not provide a `getDeployPreview` method, or
     * `show_preview_links` in the config is set to false, do nothing.
     */
    if (!this.implementation.getDeployPreview || this.config.get('show_preview_links') === false) {
      return;
    }
    /**
     * Poll for the deploy preview URL (defaults to 1 attempt, so no polling by
     * default).
     */


    let deployPreview,
        count = 0;

    while (!deployPreview && count < maxAttempts) {
      count++;
      deployPreview = await this.implementation.getDeployPreview(collection.get('name'), slug);

      if (!deployPreview) {
        await new Promise(resolve => setTimeout(() => resolve(), interval));
      }
    }
    /**
     * If there's no deploy preview, do nothing.
     */


    if (!deployPreview) {
      return;
    }

    return {
      /**
       * Create a URL using the collection `preview_path`, if provided.
       */
      url: (0, _formatters.previewUrlFormatter)(deployPreview.url, collection, slug, this.config.get('slug'), entry),

      /**
       * Always capitalize the status for consistency.
       */
      status: deployPreview.status ? deployPreview.status.toUpperCase() : ''
    };
  }

  async persistEntry({
    config,
    collection,
    entryDraft,
    assetProxies,
    usedSlugs,
    unpublished = false,
    status
  }) {
    const newEntry = entryDraft.getIn(['entry', 'newRecord']) || false;
    const parsedData = {
      title: entryDraft.getIn(['entry', 'data', 'title'], 'No Title'),
      description: entryDraft.getIn(['entry', 'data', 'description'], 'No Description!')
    };
    let entryObj;

    if (newEntry) {
      if (!(0, _collections.selectAllowNewEntries)(collection)) {
        throw new Error('Not allowed to create new entries in this collection');
      }

      const slug = await this.generateUniqueSlug(collection, entryDraft.getIn(['entry', 'data']), config, usedSlugs);
      const path = (0, _collections.selectEntryPath)(collection, slug);
      entryObj = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.get('entry'))
      };
      assetProxies.map(asset => {
        // update media files path based on entry path
        const oldPath = asset.path;
        const newPath = (0, _entries.selectMediaFilePath)(config, collection, entryDraft.get('entry').set('path', path), oldPath, asset.field);
        asset.path = newPath;
      });
    } else {
      const path = entryDraft.getIn(['entry', 'path']);
      const slug = entryDraft.getIn(['entry', 'slug']);
      entryObj = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.get('entry'))
      };
    }

    const user = await this.currentUser();
    const commitMessage = (0, _formatters.commitMessageFormatter)(newEntry ? 'create' : 'update', config, {
      collection,
      slug: entryObj.slug,
      path: entryObj.path,
      authorLogin: user.login,
      authorName: user.name
    }, user.useOpenAuthoring);
    const useWorkflow = (0, _config.selectUseWorkflow)(config);
    const collectionName = collection.get('name');
    const updatedOptions = {
      unpublished,
      status
    };

    const opts = _objectSpread({
      newEntry,
      parsedData,
      commitMessage,
      collectionName,
      useWorkflow
    }, updatedOptions);

    if (!useWorkflow) {
      await this.invokePrePublishEvent(entryDraft.get('entry'));
    }

    await this.implementation.persistEntry(entryObj, assetProxies, opts);

    if (!useWorkflow) {
      await this.invokePostPublishEvent(entryDraft.get('entry'));
    }

    return entryObj.slug;
  }

  async invokeEventWithEntry(event, entry) {
    const {
      login,
      name
    } = await this.currentUser();
    await (0, _registry.invokeEvent)({
      name: event,
      data: {
        entry,
        author: {
          login,
          name
        }
      }
    });
  }

  async invokePrePublishEvent(entry) {
    await this.invokeEventWithEntry('prePublish', entry);
  }

  async invokePostPublishEvent(entry) {
    await this.invokeEventWithEntry('postPublish', entry);
  }

  async invokePreUnpublishEvent(entry) {
    await this.invokeEventWithEntry('preUnpublish', entry);
  }

  async invokePostUnpublishEvent(entry) {
    await this.invokeEventWithEntry('postUnpublish', entry);
  }

  async persistMedia(config, file) {
    const user = await this.currentUser();
    const options = {
      commitMessage: (0, _formatters.commitMessageFormatter)('uploadMedia', config, {
        path: file.path,
        authorLogin: user.login,
        authorName: user.name
      }, user.useOpenAuthoring)
    };
    return this.implementation.persistMedia(file, options);
  }

  async deleteEntry(state, collection, slug) {
    const path = (0, _collections.selectEntryPath)(collection, slug);

    if (!(0, _collections.selectAllowDeletion)(collection)) {
      throw new Error('Not allowed to delete entries in this collection');
    }

    const config = state.config;
    const user = await this.currentUser();
    const commitMessage = (0, _formatters.commitMessageFormatter)('delete', config, {
      collection,
      slug,
      path,
      authorLogin: user.login,
      authorName: user.name
    }, user.useOpenAuthoring);
    const entry = (0, _entries.selectEntry)(state.entries, collection.get('name'), slug);
    await this.invokePreUnpublishEvent(entry);
    const result = await this.implementation.deleteFile(path, commitMessage);
    await this.invokePostUnpublishEvent(entry);
    return result;
  }

  async deleteMedia(config, path) {
    const user = await this.currentUser();
    const commitMessage = (0, _formatters.commitMessageFormatter)('deleteMedia', config, {
      path,
      authorLogin: user.login,
      authorName: user.name
    }, user.useOpenAuthoring);
    return this.implementation.deleteFile(path, commitMessage);
  }

  persistUnpublishedEntry(args) {
    return this.persistEntry(_objectSpread({}, args, {
      unpublished: true
    }));
  }

  updateUnpublishedEntryStatus(collection, slug, newStatus) {
    return this.implementation.updateUnpublishedEntryStatus(collection, slug, newStatus);
  }

  async publishUnpublishedEntry(entry) {
    const collection = entry.get('collection');
    const slug = entry.get('slug');
    await this.invokePrePublishEvent(entry);
    await this.implementation.publishUnpublishedEntry(collection, slug);
    await this.invokePostPublishEvent(entry);
  }

  deleteUnpublishedEntry(collection, slug) {
    return this.implementation.deleteUnpublishedEntry(collection, slug);
  }

  entryToRaw(collection, entry) {
    const format = (0, _formats.resolveFormat)(collection, entry.toJS());
    const fieldsOrder = this.fieldsOrder(collection, entry);
    return format && format.toFile(entry.get('data').toJS(), fieldsOrder);
  }

  fieldsOrder(collection, entry) {
    const fields = collection.get('fields');

    if (fields) {
      return collection.get('fields').map(f => f.get('name')).toArray();
    }

    const files = collection.get('files');
    const file = (files || (0, _immutable.List)()).filter(f => f.get('name') === entry.get('slug')).get(0);

    if (file == null) {
      throw new Error("No file found for ".concat(entry.get('slug'), " in ").concat(collection.get('name')));
    }

    return file.get('fields').map(f => f.get('name')).toArray();
  }

  filterEntries(collection, filterRule) {
    return collection.entries.filter(entry => {
      const fieldValue = entry.data[filterRule.get('field')];

      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(filterRule.get('value'));
      }

      return fieldValue === filterRule.get('value');
    });
  }

}

exports.Backend = Backend;

function resolveBackend(config) {
  const name = config.getIn(['backend', 'name']);

  if (name == null) {
    throw new Error('No backend defined in configuration');
  }

  const authStore = new LocalStorageAuthStore();
  const backend = (0, _registry.getBackend)(name);

  if (!backend) {
    throw new Error("Backend not found: ".concat(name));
  } else {
    return new Backend(backend, {
      backendName: name,
      authStore,
      config
    });
  }
}

const currentBackend = function () {
  let backend;
  return config => {
    if (backend) {
      return backend;
    }

    return backend = resolveBackend(config);
  };
}();

exports.currentBackend = currentBackend;