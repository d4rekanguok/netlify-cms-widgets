"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.folderFormatter = exports.summaryFormatter = exports.previewUrlFormatter = exports.slugFormatter = exports.prepareSlug = exports.commitMessageFormatter = void 0;

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _partialRight2 = _interopRequireDefault(require("lodash/partialRight"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _immutable = require("immutable");

var _urlHelper = require("./urlHelper");

var _stringTemplate = require("./stringTemplate");

var _collections = require("../reducers/collections");

var _commonTags = require("common-tags");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n        Collection \"", "\" configuration error:\n          `preview_path_date_field` must be a field with a valid date. Ignoring `preview_path`.\n      "], ["\n        Collection \"", "\" configuration error:\n          \\`preview_path_date_field\\` must be a field with a valid date. Ignoring \\`preview_path\\`.\n      "]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const commitMessageTemplates = (0, _immutable.Map)({
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”',
  openAuthoring: '{{message}}'
});
const variableRegex = /\{\{([^}]+)\}\}/g;

const commitMessageFormatter = (type, config, {
  slug,
  path,
  collection,
  authorLogin,
  authorName
}, isOpenAuthoring) => {
  const templates = commitMessageTemplates.merge(config.getIn(['backend', 'commit_messages'], (0, _immutable.Map)()));
  const commitMessage = templates.get(type).replace(variableRegex, (_, variable) => {
    switch (variable) {
      case 'slug':
        return slug || '';

      case 'path':
        return path || '';

      case 'collection':
        return collection ? collection.get('label_singular') || collection.get('label') : '';

      default:
        console.warn("Ignoring unknown variable \u201C".concat(variable, "\u201D in commit message template."));
        return '';
    }
  });

  if (!isOpenAuthoring) {
    return commitMessage;
  }

  const message = templates.get('openAuthoring').replace(variableRegex, (_, variable) => {
    switch (variable) {
      case 'message':
        return commitMessage;

      case 'author-login':
        return authorLogin || '';

      case 'author-name':
        return authorName || '';

      default:
        console.warn("Ignoring unknown variable \u201C".concat(variable, "\u201D in open authoring message template."));
        return '';
    }
  });
  return message;
};

exports.commitMessageFormatter = commitMessageFormatter;

const prepareSlug = slug => {
  return slug.trim() // Convert slug to lower-case
  .toLocaleLowerCase() // Remove single quotes.
  .replace(/[']/g, '') // Replace periods with dashes.
  .replace(/[.]/g, '-');
};

exports.prepareSlug = prepareSlug;

const getProcessSegment = slugConfig => (0, _flow2.default)([value => String(value), prepareSlug, (0, _partialRight2.default)(_urlHelper.sanitizeSlug, slugConfig)]);

const slugFormatter = (collection, entryData, slugConfig) => {
  const slugTemplate = collection.get('slug') || '{{slug}}';
  const identifier = entryData.getIn((0, _stringTemplate.keyToPathArray)((0, _collections.selectIdentifier)(collection)));

  if (!identifier) {
    throw new Error('Collection must have a field name that is a valid entry identifier, or must have `identifier_field` set');
  }

  const processSegment = getProcessSegment(slugConfig);
  const date = new Date();
  const slug = (0, _stringTemplate.compileStringTemplate)(slugTemplate, date, identifier, entryData, processSegment);

  if (!collection.has('path')) {
    return slug;
  } else {
    const pathTemplate = collection.get('path');
    return (0, _stringTemplate.compileStringTemplate)(pathTemplate, date, slug, entryData, value => value === slug ? value : processSegment(value));
  }
};

exports.slugFormatter = slugFormatter;

const addFileTemplateFields = (entryPath, fields) => {
  if (!entryPath) {
    return fields;
  }

  const extension = (0, _netlifyCmsLibUtil.fileExtension)(entryPath);
  const filename = (0, _netlifyCmsLibUtil.basename)(entryPath, ".".concat(extension));
  fields = fields.withMutations(map => {
    map.set('filename', filename);
    map.set('extension', extension);
  });
  return fields;
};

const previewUrlFormatter = (baseUrl, collection, slug, slugConfig, entry) => {
  /**
   * Preview URL can't be created without `baseUrl`. This makes preview URLs
   * optional for backends that don't support them.
   */
  if (!baseUrl) {
    return;
  }
  /**
   * Without a `previewPath` for the collection (via config), the preview URL
   * will be the URL provided by the backend.
   */


  if (!collection.get('preview_path')) {
    return baseUrl;
  }
  /**
   * If a `previewPath` is provided for the collection, use it to construct the
   * URL path.
   */


  const basePath = (0, _trimEnd2.default)(baseUrl, '/');
  const pathTemplate = collection.get('preview_path');
  let fields = entry.get('data');
  fields = addFileTemplateFields(entry.get('path'), fields);
  const date = (0, _stringTemplate.parseDateFromEntry)(entry, collection, collection.get('preview_path_date_field')); // Prepare and sanitize slug variables only, leave the rest of the
  // `preview_path` template as is.

  const processSegment = getProcessSegment(slugConfig);
  let compiledPath;

  try {
    compiledPath = (0, _stringTemplate.compileStringTemplate)(pathTemplate, date, slug, fields, processSegment);
  } catch (err) {
    // Print an error and ignore `preview_path` if both:
    //   1. Date is invalid (according to Moment), and
    //   2. A date expression (eg. `{{year}}`) is used in `preview_path`
    if (err.name === _stringTemplate.SLUG_MISSING_REQUIRED_DATE) {
      console.error((0, _commonTags.stripIndent)(_templateObject(), collection.get('name')));
      return basePath;
    }

    throw err;
  }

  const previewPath = (0, _trimStart2.default)(compiledPath, ' /');
  return "".concat(basePath, "/").concat(previewPath);
};

exports.previewUrlFormatter = previewUrlFormatter;

const summaryFormatter = (summaryTemplate, entry, collection) => {
  let entryData = entry.get('data');
  const date = (0, _stringTemplate.parseDateFromEntry)(entry, collection) || null;
  const identifier = entryData.getIn((0, _stringTemplate.keyToPathArray)((0, _collections.selectIdentifier)(collection)));
  entryData = addFileTemplateFields(entry.get('path'), entryData);
  const summary = (0, _stringTemplate.compileStringTemplate)(summaryTemplate, date, identifier, entryData);
  return summary;
};

exports.summaryFormatter = summaryFormatter;

const folderFormatter = (folderTemplate, entry, collection, defaultFolder, folderKey, slugConfig) => {
  if (!entry || !entry.get('data')) {
    return folderTemplate;
  }

  let fields = entry.get('data').set(folderKey, defaultFolder);
  fields = addFileTemplateFields(entry.get('path'), fields);
  const date = (0, _stringTemplate.parseDateFromEntry)(entry, collection) || null;
  const identifier = fields.getIn((0, _stringTemplate.keyToPathArray)((0, _collections.selectIdentifier)(collection)));
  const processSegment = getProcessSegment(slugConfig);
  const mediaFolder = (0, _stringTemplate.compileStringTemplate)(folderTemplate, date, identifier, fields, value => value === defaultFolder ? defaultFolder : processSegment(value));
  return mediaFolder;
};

exports.folderFormatter = folderFormatter;