"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _Entry = require("../../../valueObjects/Entry");

var _collections = require("../../../reducers/collections");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getSlug(path) {
  return path.split('/').pop().replace(/\.[^.]+$/, '');
}

class Algolia {
  constructor(config) {
    this.config = config;

    if (config.get('applicationID') == null || config.get('apiKey') == null) {
      throw 'The Algolia search integration needs the credentials (applicationID and apiKey) in the integration configuration.';
    }

    this.applicationID = config.get('applicationID');
    this.apiKey = config.get('apiKey');
    const prefix = config.get('indexPrefix');
    this.indexPrefix = prefix ? "".concat(prefix, "-") : '';
    this.searchURL = "https://".concat(this.applicationID, "-dsn.algolia.net/1");
    this.entriesCache = {
      collection: null,
      page: null,
      entries: []
    };
  }

  requestHeaders(headers = {}) {
    return _objectSpread({
      'X-Algolia-API-Key': this.apiKey,
      'X-Algolia-Application-Id': this.applicationID,
      'Content-Type': 'application/json'
    }, headers);
  }

  parseJsonResponse(response) {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  }

  urlFor(path, options) {
    const params = [];

    if (options.params) {
      for (const key in options.params) {
        params.push("".concat(key, "=").concat(encodeURIComponent(options.params[key])));
      }
    }

    if (params.length) {
      path += "?".concat(params.join('&'));
    }

    return path;
  }

  request(path, options = {}) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options);
    return fetch(url, _objectSpread({}, options, {
      headers
    })).then(response => {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.match(/json/)) {
        return this.parseJsonResponse(response);
      }

      return response.text();
    });
  }

  search(collections, searchTerm, page) {
    const searchCollections = collections.map(collection => ({
      indexName: "".concat(this.indexPrefix).concat(collection),
      params: "query=".concat(searchTerm, "&page=").concat(page)
    }));
    return this.request("".concat(this.searchURL, "/indexes/*/queries"), {
      method: 'POST',
      body: JSON.stringify({
        requests: searchCollections
      })
    }).then(response => {
      const entries = response.results.map((result, index) => result.hits.map(hit => {
        const slug = getSlug(hit.path);
        return (0, _Entry.createEntry)(collections[index], slug, hit.path, {
          data: hit.data,
          partial: true
        });
      }));
      return {
        entries: (0, _flatten2.default)(entries),
        pagination: page
      };
    });
  }

  searchBy(field, collection, query) {
    return this.request("".concat(this.searchURL, "/indexes/").concat(this.indexPrefix).concat(collection), {
      params: {
        restrictSearchableAttributes: field,
        query
      }
    });
  }

  listEntries(collection, page) {
    if (this.entriesCache.collection === collection && this.entriesCache.page === page) {
      return Promise.resolve({
        page: this.entriesCache.page,
        entries: this.entriesCache.entries
      });
    } else {
      return this.request("".concat(this.searchURL, "/indexes/").concat(this.indexPrefix).concat(collection.get('name')), {
        params: {
          page
        }
      }).then(response => {
        const entries = response.hits.map(hit => {
          const slug = (0, _collections.selectEntrySlug)(collection, hit.path);
          return (0, _Entry.createEntry)(collection.get('name'), slug, hit.path, {
            data: hit.data,
            partial: true
          });
        });
        this.entriesCache = {
          collection,
          pagination: response.page,
          entries
        };
        return {
          entries,
          pagination: response.page
        };
      });
    }
  }

  getEntry(collection, slug) {
    return this.searchBy('slug', collection.get('name'), slug).then(response => {
      const entry = response.hits.filter(hit => hit.slug === slug)[0];
      return (0, _Entry.createEntry)(collection.get('name'), slug, entry.path, {
        data: entry.data,
        partial: true
      });
    });
  }

}

exports.default = Algolia;