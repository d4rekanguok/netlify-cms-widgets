"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));

var _urlHelper = require("../../../lib/urlHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AssetStore {
  constructor(config, getToken) {
    this.config = config;

    if (config.get('getSignedFormURL') == null) {
      throw 'The AssetStore integration needs the getSignedFormURL in the integration configuration.';
    }

    this.getToken = getToken;
    this.shouldConfirmUpload = config.get('shouldConfirmUpload', false);
    this.getSignedFormURL = (0, _trimEnd2.default)(config.get('getSignedFormURL'), '/');
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

  requestHeaders(headers = {}) {
    return _objectSpread({}, headers);
  }

  confirmRequest(assetID) {
    this.getToken().then(token => this.request("".concat(this.getSignedFormURL, "/").concat(assetID), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(token)
      },
      body: JSON.stringify({
        state: 'uploaded'
      })
    }));
  }

  async request(path, options = {}) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options);
    const response = await fetch(url, _objectSpread({}, options, {
      headers
    }));
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.match(/json/);
    const content = isJson ? await this.parseJsonResponse(response) : response.text();
    return content;
  }

  async retrieve(query, page, privateUpload) {
    const params = (0, _pickBy2.default)({
      search: query,
      page,
      filter: privateUpload ? 'private' : 'public'
    }, val => !!val);
    const url = (0, _urlHelper.addParams)(this.getSignedFormURL, params);
    const token = await this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(token)
    };
    const response = await this.request(url, {
      headers
    });
    const files = response.map(({
      id,
      name,
      size,
      url
    }) => {
      return {
        id,
        name,
        size,
        displayURL: url,
        url
      };
    });
    return files;
  }

  delete(assetID) {
    const url = "".concat(this.getSignedFormURL, "/").concat(assetID);
    return this.getToken().then(token => this.request(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(token)
      }
    }));
  }

  async upload(file, privateUpload = false) {
    const fileData = {
      name: file.name,
      size: file.size
    };

    if (file.type) {
      fileData.content_type = file.type;
    }

    if (privateUpload) {
      fileData.visibility = 'private';
    }

    try {
      const token = await this.getToken();
      const response = await this.request(this.getSignedFormURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(token)
        },
        body: JSON.stringify(fileData)
      });
      const formURL = response.form.url;
      const formFields = response.form.fields;
      const {
        id,
        name,
        size,
        url
      } = response.asset;
      const formData = new FormData();
      Object.keys(formFields).forEach(key => formData.append(key, formFields[key]));
      formData.append('file', file, file.name);
      await this.request(formURL, {
        method: 'POST',
        body: formData
      });

      if (this.shouldConfirmUpload) {
        await this.confirmRequest(id);
      }

      const asset = {
        id,
        name,
        size,
        displayURL: url,
        url
      };
      return {
        success: true,
        asset
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

exports.default = AssetStore;