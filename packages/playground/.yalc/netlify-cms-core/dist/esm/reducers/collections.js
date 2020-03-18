"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectInferedField = exports.selectIdentifier = exports.updateFieldByKey = exports.selectField = exports.getFieldsNames = exports.selectTemplateName = exports.selectAllowDeletion = exports.selectAllowNewEntries = exports.selectEntrySlug = exports.selectEntryPath = exports.selectFileEntryLabel = exports.selectFolderEntryExtension = exports.selectFields = exports.selectMediaFolders = exports.selectFieldsWithMediaFolders = void 0;

var _escapeRegExp2 = _interopRequireDefault(require("lodash/escapeRegExp"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _immutable = require("immutable");

var _consoleError = _interopRequireDefault(require("../lib/consoleError"));

var _config = require("../actions/config");

var _collectionTypes = require("../constants/collectionTypes");

var _fieldInference = require("../constants/fieldInference");

var _formats = require("../formats/formats");

var _entries = require("./entries");

var _stringTemplate = require("../lib/stringTemplate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const collections = (state = null, action) => {
  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const configCollections = action.payload ? action.payload.get('collections') : (0, _immutable.List)();
        return configCollections.toOrderedMap().map(item => {
          const collection = item;

          if (collection.has('folder')) {
            return collection.set('type', _collectionTypes.FOLDER);
          }

          if (collection.has('files')) {
            return collection.set('type', _collectionTypes.FILES);
          }
        }) // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .mapKeys((key, collection) => collection.get('name'));
      }

    default:
      return state;
  }
};

const selectors = {
  [_collectionTypes.FOLDER]: {
    entryExtension(collection) {
      return (collection.get('extension') || (0, _get2.default)(_formats.formatExtensions, collection.get('format') || 'frontmatter')).replace(/^\./, '');
    },

    fields(collection) {
      return collection.get('fields');
    },

    entryPath(collection, slug) {
      const folder = collection.get('folder').replace(/\/$/, '');
      return "".concat(folder, "/").concat(slug, ".").concat(this.entryExtension(collection));
    },

    entrySlug(collection, path) {
      var _path$split$pop;

      const folder = collection.get('folder').replace(/\/$/, '');
      const slug = (_path$split$pop = path.split(folder + '/').pop()) === null || _path$split$pop === void 0 ? void 0 : _path$split$pop.replace(new RegExp("\\.".concat((0, _escapeRegExp2.default)(this.entryExtension(collection)), "$")), '');
      return slug;
    },

    allowNewEntries(collection) {
      return collection.get('create');
    },

    allowDeletion(collection) {
      return collection.get('delete', true);
    },

    templateName(collection) {
      return collection.get('name');
    }

  },
  [_collectionTypes.FILES]: {
    fileForEntry(collection, slug) {
      const files = collection.get('files');
      return files && files.filter(f => (f === null || f === void 0 ? void 0 : f.get('name')) === slug).get(0);
    },

    fields(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('fields');
    },

    entryPath(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('file');
    },

    entrySlug(collection, path) {
      const file = collection.get('files').filter(f => (f === null || f === void 0 ? void 0 : f.get('file')) === path).get(0);
      return file && file.get('name');
    },

    entryLabel(collection, slug) {
      const path = this.entryPath(collection, slug);
      const files = collection.get('files');
      return files && files.find(f => (f === null || f === void 0 ? void 0 : f.get('file')) === path).get('label');
    },

    allowNewEntries() {
      return false;
    },

    allowDeletion(collection) {
      return collection.get('delete', false);
    },

    templateName(_collection, slug) {
      return slug;
    }

  }
};

const getFieldsWithMediaFolders = fields => {
  const fieldsWithMediaFolders = fields.reduce((acc, f) => {
    if (f.has('media_folder')) {
      acc = [...acc, f];
    }

    if (f.has('fields')) {
      var _f$get;

      const fields = (_f$get = f.get('fields')) === null || _f$get === void 0 ? void 0 : _f$get.toArray();
      acc = [...acc, ...getFieldsWithMediaFolders(fields)];
    } else if (f.has('field')) {
      const field = f.get('field');
      acc = [...acc, ...getFieldsWithMediaFolders([field])];
    } else if (f.has('types')) {
      var _f$get2;

      const types = (_f$get2 = f.get('types')) === null || _f$get2 === void 0 ? void 0 : _f$get2.toArray();
      acc = [...acc, ...getFieldsWithMediaFolders(types)];
    }

    return acc;
  }, []);
  return fieldsWithMediaFolders;
};

const getFileFromSlug = (collection, slug) => {
  var _collection$get;

  return (_collection$get = collection.get('files')) === null || _collection$get === void 0 ? void 0 : _collection$get.toArray().filter(f => f.get('name') === slug)[0];
};

const selectFieldsWithMediaFolders = (collection, slug) => {
  if (collection.has('folder')) {
    const fields = collection.get('fields').toArray();
    return getFieldsWithMediaFolders(fields);
  } else if (collection.has('files')) {
    var _getFileFromSlug;

    const fields = ((_getFileFromSlug = getFileFromSlug(collection, slug)) === null || _getFileFromSlug === void 0 ? void 0 : _getFileFromSlug.get('fields').toArray()) || [];
    return getFieldsWithMediaFolders(fields);
  }

  return [];
};

exports.selectFieldsWithMediaFolders = selectFieldsWithMediaFolders;

const selectMediaFolders = (state, collection, entry) => {
  const fields = selectFieldsWithMediaFolders(collection, entry.get('slug'));
  const folders = fields.map(f => (0, _entries.selectMediaFolder)(state.config, collection, entry, f));

  if (collection.has('files')) {
    const file = getFileFromSlug(collection, entry.get('slug'));

    if (file) {
      folders.unshift((0, _entries.selectMediaFolder)(state.config, collection, entry, undefined));
    }
  }

  if (collection.has('media_folder')) {
    // stop evaluating media folders at collection level
    collection = collection.delete('files');
    folders.unshift((0, _entries.selectMediaFolder)(state.config, collection, entry, undefined));
  }

  return folders;
};

exports.selectMediaFolders = selectMediaFolders;

const selectFields = (collection, slug) => selectors[collection.get('type')].fields(collection, slug);

exports.selectFields = selectFields;

const selectFolderEntryExtension = collection => selectors[_collectionTypes.FOLDER].entryExtension(collection);

exports.selectFolderEntryExtension = selectFolderEntryExtension;

const selectFileEntryLabel = (collection, slug) => selectors[_collectionTypes.FILES].entryLabel(collection, slug);

exports.selectFileEntryLabel = selectFileEntryLabel;

const selectEntryPath = (collection, slug) => selectors[collection.get('type')].entryPath(collection, slug);

exports.selectEntryPath = selectEntryPath;

const selectEntrySlug = (collection, path) => selectors[collection.get('type')].entrySlug(collection, path);

exports.selectEntrySlug = selectEntrySlug;

const selectAllowNewEntries = collection => selectors[collection.get('type')].allowNewEntries(collection);

exports.selectAllowNewEntries = selectAllowNewEntries;

const selectAllowDeletion = collection => selectors[collection.get('type')].allowDeletion(collection);

exports.selectAllowDeletion = selectAllowDeletion;

const selectTemplateName = (collection, slug) => selectors[collection.get('type')].templateName(collection, slug);

exports.selectTemplateName = selectTemplateName;

const getFieldsNames = (fields, prefix = '') => {
  let names = fields.map(f => "".concat(prefix).concat(f.get('name')));
  fields.forEach((f, index) => {
    if (f.has('fields')) {
      var _f$get3;

      const fields = (_f$get3 = f.get('fields')) === null || _f$get3 === void 0 ? void 0 : _f$get3.toArray();
      names = [...names, ...getFieldsNames(fields, "".concat(names[index], "."))];
    } else if (f.has('field')) {
      const field = f.get('field');
      names = [...names, ...getFieldsNames([field], "".concat(names[index], "."))];
    } else if (f.has('types')) {
      var _f$get4;

      const types = (_f$get4 = f.get('types')) === null || _f$get4 === void 0 ? void 0 : _f$get4.toArray();
      names = [...names, ...getFieldsNames(types, "".concat(names[index], "."))];
    }
  });
  return names;
};

exports.getFieldsNames = getFieldsNames;

const selectField = (collection, key) => {
  const array = (0, _stringTemplate.keyToPathArray)(key);
  let name;
  let field;
  let fields = collection.get('fields', (0, _immutable.List)()).toArray();

  while ((name = array.shift()) && fields) {
    var _field, _field3, _field5;

    field = fields.find(f => f.get('name') === name);

    if ((_field = field) === null || _field === void 0 ? void 0 : _field.has('fields')) {
      var _field2, _field2$get;

      fields = (_field2 = field) === null || _field2 === void 0 ? void 0 : (_field2$get = _field2.get('fields')) === null || _field2$get === void 0 ? void 0 : _field2$get.toArray();
    } else if ((_field3 = field) === null || _field3 === void 0 ? void 0 : _field3.has('field')) {
      var _field4;

      fields = [(_field4 = field) === null || _field4 === void 0 ? void 0 : _field4.get('field')];
    } else if ((_field5 = field) === null || _field5 === void 0 ? void 0 : _field5.has('types')) {
      var _field6, _field6$get;

      fields = (_field6 = field) === null || _field6 === void 0 ? void 0 : (_field6$get = _field6.get('types')) === null || _field6$get === void 0 ? void 0 : _field6$get.toArray();
    }
  }

  return field;
};

exports.selectField = selectField;

const updateFieldByKey = (collection, key, updater) => {
  const selected = selectField(collection, key);

  if (!selected) {
    return collection;
  }

  let updated = false;

  const traverseFields = fields => {
    if (updated) {
      // we can stop once the field is found
      return fields;
    }

    fields = fields.map(f => {
      const field = f;

      if (field === selected) {
        updated = true;
        return updater(field);
      } else if (field.has('fields')) {
        return field.set('fields', traverseFields(field.get('fields')));
      } else if (field.has('field')) {
        return field.set('field', traverseFields((0, _immutable.List)([field.get('field')])).get(0));
      } else if (field.has('types')) {
        return field.set('types', traverseFields(field.get('types')));
      } else {
        return field;
      }
    }).toList();
    return fields;
  };

  collection = collection.set('fields', traverseFields(collection.get('fields', (0, _immutable.List)())));
  return collection;
};

exports.updateFieldByKey = updateFieldByKey;

const selectIdentifier = collection => {
  const identifier = collection.get('identifier_field');
  const identifierFields = identifier ? [identifier, ..._fieldInference.IDENTIFIER_FIELDS] : _fieldInference.IDENTIFIER_FIELDS;
  const fieldNames = getFieldsNames(collection.get('fields', (0, _immutable.List)()).toArray());
  return identifierFields.find(id => fieldNames.find(name => (name === null || name === void 0 ? void 0 : name.toLowerCase().trim()) === id.toLowerCase().trim()));
};

exports.selectIdentifier = selectIdentifier;

const selectInferedField = (collection, fieldName) => {
  if (fieldName === 'title' && collection.get('identifier_field')) {
    return selectIdentifier(collection);
  }

  const inferableField = _fieldInference.INFERABLE_FIELDS[fieldName];
  const fields = collection.get('fields');
  let field; // If collection has no fields or fieldName is not defined within inferables list, return null

  if (!fields || !inferableField) return null; // Try to return a field of the specified type with one of the synonyms

  const mainTypeFields = fields.filter(f => (f === null || f === void 0 ? void 0 : f.get('widget', 'string')) === inferableField.type).map(f => f === null || f === void 0 ? void 0 : f.get('name'));
  field = mainTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return a field for each of the specified secondary types

  const secondaryTypeFields = fields.filter(f => inferableField.secondaryTypes.indexOf(f === null || f === void 0 ? void 0 : f.get('widget', 'string')) !== -1).map(f => f === null || f === void 0 ? void 0 : f.get('name'));
  field = secondaryTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return the first field of the specified type

  if (inferableField.fallbackToFirstField && mainTypeFields.size > 0) return mainTypeFields.first(); // Coundn't infer the field. Show error and return null.

  if (inferableField.showError) {
    (0, _consoleError.default)("The Field ".concat(fieldName, " is missing for the collection \u201C").concat(collection.get('name'), "\u201D"), "Netlify CMS tries to infer the entry ".concat(fieldName, " automatically, but one couldn't be found for entries of the collection \u201C").concat(collection.get('name'), "\u201D. Please check your site configuration."));
  }

  return null;
};

exports.selectInferedField = selectInferedField;
var _default = collections;
exports.default = _default;