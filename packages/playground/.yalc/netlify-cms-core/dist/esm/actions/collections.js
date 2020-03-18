"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchCollections = searchCollections;
exports.showCollection = showCollection;
exports.createNewEntry = createNewEntry;

var _history = _interopRequireDefault(require("../routing/history"));

var _urlHelper = require("../lib/urlHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchCollections(query) {
  _history.default.push("/search/".concat(query));
}

function showCollection(collectionName) {
  _history.default.push((0, _urlHelper.getCollectionUrl)(collectionName));
}

function createNewEntry(collectionName) {
  _history.default.push((0, _urlHelper.getNewEntryUrl)(collectionName));
}