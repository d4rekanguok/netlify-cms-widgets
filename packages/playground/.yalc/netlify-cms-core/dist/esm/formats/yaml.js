"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _moment = _interopRequireDefault(require("moment"));

var _AssetProxy = _interopRequireDefault(require("../valueObjects/AssetProxy"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MomentType = new _jsYaml.default.Type('date', {
  kind: 'scalar',

  predicate(value) {
    return _moment.default.isMoment(value);
  },

  represent(value) {
    return value.format(value._f);
  },

  resolve(value) {
    return _moment.default.isMoment(value) && value._f;
  }

});
const ImageType = new _jsYaml.default.Type('image', {
  kind: 'scalar',
  instanceOf: _AssetProxy.default,

  represent(value) {
    return "".concat(value.path);
  },

  resolve(value) {
    if (value === null) return false;
    if (value instanceof _AssetProxy.default) return true;
    return false;
  }

});
const OutputSchema = new _jsYaml.default.Schema({
  include: _jsYaml.default.DEFAULT_SAFE_SCHEMA.include,
  implicit: [MomentType, ImageType].concat(_jsYaml.default.DEFAULT_SAFE_SCHEMA.implicit),
  explicit: _jsYaml.default.DEFAULT_SAFE_SCHEMA.explicit
});
var _default = {
  fromFile(content) {
    if (content && content.trim().endsWith('---')) {
      content = content.trim().slice(0, -3);
    }

    return _jsYaml.default.safeLoad(content);
  },

  toFile(data, sortedKeys = []) {
    return _jsYaml.default.safeDump(data, {
      schema: OutputSchema,
      sortKeys: (0, _helpers.sortKeys)(sortedKeys)
    });
  }

};
exports.default = _default;