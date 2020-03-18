"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIntegration = exports.selectUnpublishedSlugs = exports.selectUnpublishedEntriesByStatus = exports.selectUnpublishedEntry = exports.selectDeployPreview = exports.selectSearchedEntries = exports.selectPublishedSlugs = exports.selectEntries = exports.selectEntry = exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _config = _interopRequireDefault(require("./config"));

var fromIntegrations = _interopRequireWildcard(require("./integrations"));

var fromEntries = _interopRequireWildcard(require("./entries"));

var _cursors = _interopRequireDefault(require("./cursors"));

var fromEditorialWorkflow = _interopRequireWildcard(require("./editorialWorkflow"));

var _entryDraft = _interopRequireDefault(require("./entryDraft"));

var _collections = _interopRequireDefault(require("./collections"));

var _search = _interopRequireDefault(require("./search"));

var _medias = _interopRequireDefault(require("./medias"));

var _mediaLibrary = _interopRequireDefault(require("./mediaLibrary"));

var fromDeploys = _interopRequireWildcard(require("./deploys"));

var _globalUI = _interopRequireDefault(require("./globalUI"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducers = {
  auth: _auth.default,
  config: _config.default,
  collections: _collections.default,
  search: _search.default,
  integrations: fromIntegrations.default,
  entries: fromEntries.default,
  cursors: _cursors.default,
  editorialWorkflow: fromEditorialWorkflow.default,
  entryDraft: _entryDraft.default,
  medias: _medias.default,
  mediaLibrary: _mediaLibrary.default,
  deploys: fromDeploys.default,
  globalUI: _globalUI.default
};
var _default = reducers;
/*
 * Selectors
 */

exports.default = _default;

const selectEntry = (state, collection, slug) => fromEntries.selectEntry(state.entries, collection, slug);

exports.selectEntry = selectEntry;

const selectEntries = (state, collection) => fromEntries.selectEntries(state.entries, collection);

exports.selectEntries = selectEntries;

const selectPublishedSlugs = (state, collection) => fromEntries.selectPublishedSlugs(state.entries, collection);

exports.selectPublishedSlugs = selectPublishedSlugs;

const selectSearchedEntries = state => {
  const searchItems = state.search.get('entryIds');
  return searchItems && searchItems.map(({
    collection,
    slug
  }) => fromEntries.selectEntry(state.entries, collection, slug));
};

exports.selectSearchedEntries = selectSearchedEntries;

const selectDeployPreview = (state, collection, slug) => fromDeploys.selectDeployPreview(state.deploys, collection, slug);

exports.selectDeployPreview = selectDeployPreview;

const selectUnpublishedEntry = (state, collection, slug) => fromEditorialWorkflow.selectUnpublishedEntry(state.editorialWorkflow, collection, slug);

exports.selectUnpublishedEntry = selectUnpublishedEntry;

const selectUnpublishedEntriesByStatus = (state, status) => fromEditorialWorkflow.selectUnpublishedEntriesByStatus(state.editorialWorkflow, status);

exports.selectUnpublishedEntriesByStatus = selectUnpublishedEntriesByStatus;

const selectUnpublishedSlugs = (state, collection) => fromEditorialWorkflow.selectUnpublishedSlugs(state.editorialWorkflow, collection);

exports.selectUnpublishedSlugs = selectUnpublishedSlugs;

const selectIntegration = (state, collection, hook) => fromIntegrations.selectIntegration(state.integrations, collection, hook);

exports.selectIntegration = selectIntegration;