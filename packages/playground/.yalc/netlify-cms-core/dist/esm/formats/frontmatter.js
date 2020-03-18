"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontmatterJSON = exports.frontmatterTOML = exports.frontmatterYAML = exports.FrontmatterInfer = exports.getFormatOpts = void 0;

var _grayMatter = _interopRequireDefault(require("gray-matter"));

var _toml = _interopRequireDefault(require("./toml"));

var _yaml = _interopRequireDefault(require("./yaml"));

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parsers = {
  toml: {
    parse: input => _toml.default.fromFile(input),
    stringify: (metadata, {
      sortedKeys
    }) => _toml.default.toFile(metadata, sortedKeys)
  },
  json: {
    parse: input => {
      let JSONinput = input.trim(); // Fix JSON if leading and trailing brackets were trimmed.

      if (JSONinput.substr(0, 1) !== '{') {
        JSONinput = '{' + JSONinput;
      }

      if (JSONinput.substr(-1) !== '}') {
        JSONinput = JSONinput + '}';
      }

      return _json.default.fromFile(JSONinput);
    },
    stringify: (metadata, {
      sortedKeys
    }) => {
      let JSONoutput = _json.default.toFile(metadata, sortedKeys).trim(); // Trim leading and trailing brackets.


      if (JSONoutput.substr(0, 1) === '{' && JSONoutput.substr(-1) === '}') {
        JSONoutput = JSONoutput.substring(1, JSONoutput.length - 1);
      }

      return JSONoutput;
    }
  },
  yaml: {
    parse: input => _yaml.default.fromFile(input),
    stringify: (metadata, {
      sortedKeys
    }) => _yaml.default.toFile(metadata, sortedKeys)
  }
};

function inferFrontmatterFormat(str) {
  const firstLine = str.substr(0, str.indexOf('\n')).trim();

  if (firstLine.length > 3 && firstLine.substr(0, 3) === '---') {
    // No need to infer, `gray-matter` will handle things like `---toml` for us.
    return;
  }

  switch (firstLine) {
    case '---':
      return getFormatOpts('yaml');

    case '+++':
      return getFormatOpts('toml');

    case '{':
      return getFormatOpts('json');

    default:
      console.warn('Unrecognized front-matter format.');
  }
}

const getFormatOpts = format => ({
  yaml: {
    language: 'yaml',
    delimiters: '---'
  },
  toml: {
    language: 'toml',
    delimiters: '+++'
  },
  json: {
    language: 'json',
    delimiters: ['{', '}']
  }
})[format];

exports.getFormatOpts = getFormatOpts;

class FrontmatterFormatter {
  constructor(format, customDelimiter) {
    this.format = getFormatOpts(format);
    this.customDelimiter = customDelimiter;
  }

  fromFile(content) {
    const format = this.format || inferFrontmatterFormat(content);
    if (this.customDelimiter) this.format.delimiters = this.customDelimiter;
    const result = (0, _grayMatter.default)(content, _objectSpread({
      engines: parsers
    }, format)); // in the absent of a body when serializing an entry we use an empty one
    // when calling `toFile`, so we don't want to add it when parsing.

    return _objectSpread({}, result.data, {}, result.content.trim() && {
      body: result.content
    });
  }

  toFile(data, sortedKeys) {
    const {
      body = ''
    } = data,
          meta = _objectWithoutProperties(data, ["body"]); // Stringify to YAML if the format was not set


    const format = this.format || getFormatOpts('yaml');
    if (this.customDelimiter) this.format.delimiters = this.customDelimiter; // gray-matter always adds a line break at the end which trips our
    // change detection logic
    // https://github.com/jonschlinkert/gray-matter/issues/96

    const trimLastLineBreak = body.slice(-1) !== '\n' ? true : false; // `sortedKeys` is not recognized by gray-matter, so it gets passed through to the parser

    const file = _grayMatter.default.stringify(body, meta, _objectSpread({
      engines: parsers,
      sortedKeys
    }, format));

    return trimLastLineBreak && file.slice(-1) === '\n' ? file.substring(0, file.length - 1) : file;
  }

}

const FrontmatterInfer = new FrontmatterFormatter();
exports.FrontmatterInfer = FrontmatterInfer;

const frontmatterYAML = customDelimiter => new FrontmatterFormatter('yaml', customDelimiter);

exports.frontmatterYAML = frontmatterYAML;

const frontmatterTOML = customDelimiter => new FrontmatterFormatter('toml', customDelimiter);

exports.frontmatterTOML = frontmatterTOML;

const frontmatterJSON = customDelimiter => new FrontmatterFormatter('json', customDelimiter);

exports.frontmatterJSON = frontmatterJSON;