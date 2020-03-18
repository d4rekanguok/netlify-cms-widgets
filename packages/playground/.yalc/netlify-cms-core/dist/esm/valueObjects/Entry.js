"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntry = createEntry;

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEntry(collection, slug = '', path = '', options = {}) {
  const returnObj = {
    collection,
    slug,
    path,
    partial: options.partial || false,
    raw: options.raw || '',
    data: options.data || {},
    label: options.label || null,
    metaData: options.metaData || null,
    isModification: (0, _isBoolean2.default)(options.isModification) ? options.isModification : null,
    mediaFiles: options.mediaFiles || []
  };
  return returnObj;
}