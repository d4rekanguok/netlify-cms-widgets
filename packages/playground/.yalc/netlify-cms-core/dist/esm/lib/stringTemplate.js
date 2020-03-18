"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateFromEntry = parseDateFromEntry;
exports.compileStringTemplate = compileStringTemplate;
exports.extractTemplateVars = extractTemplateVars;
exports.keyToPathArray = exports.SLUG_MISSING_REQUIRED_DATE = exports.dateParsers = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _immutable = require("immutable");

var _collections = require("../reducers/collections");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// prepends a Zero if the date has only 1 digit
function formatDate(date) {
  return "0".concat(date).slice(-2);
}

const dateParsers = {
  year: date => "".concat(date.getUTCFullYear()),
  month: date => formatDate(date.getUTCMonth() + 1),
  day: date => formatDate(date.getUTCDate()),
  hour: date => formatDate(date.getUTCHours()),
  minute: date => formatDate(date.getUTCMinutes()),
  second: date => formatDate(date.getUTCSeconds())
};
exports.dateParsers = dateParsers;
const SLUG_MISSING_REQUIRED_DATE = 'SLUG_MISSING_REQUIRED_DATE';
exports.SLUG_MISSING_REQUIRED_DATE = SLUG_MISSING_REQUIRED_DATE;
const FIELD_PREFIX = 'fields.';
const templateContentPattern = '[^}{]+';
const templateVariablePattern = "{{(".concat(templateContentPattern, ")}}");

const keyToPathArray = key => {
  if (!key) {
    return [];
  }

  const parts = [];
  const separator = '';
  const chars = key.split(separator);
  let currentChar;
  let currentStr = [];

  while (currentChar = chars.shift()) {
    if (['[', ']', '.'].includes(currentChar)) {
      if (currentStr.length > 0) {
        parts.push(currentStr.join(separator));
      }

      currentStr = [];
    } else {
      currentStr.push(currentChar);
    }
  }

  if (currentStr.length > 0) {
    parts.push(currentStr.join(separator));
  }

  return parts;
}; // Allow `fields.` prefix in placeholder to override built in replacements
// like "slug" and "year" with values from fields of the same name.


exports.keyToPathArray = keyToPathArray;

function getExplicitFieldReplacement(key, data) {
  if (!key.startsWith(FIELD_PREFIX)) {
    return;
  }

  const fieldName = key.substring(FIELD_PREFIX.length);
  return data.getIn(keyToPathArray(fieldName), '');
}

function parseDateFromEntry(entry, collection, fieldName) {
  const dateFieldName = fieldName || (0, _collections.selectInferedField)(collection, 'date');

  if (!dateFieldName) {
    return;
  }

  const dateValue = entry.getIn(['data', dateFieldName]);
  const dateMoment = dateValue && (0, _moment.default)(dateValue);

  if (dateMoment && dateMoment.isValid()) {
    return dateMoment.toDate();
  }
}

function compileStringTemplate(template, date, identifier = '', data = (0, _immutable.Map)(), processor) {
  let missingRequiredDate; // Turn off date processing (support for replacements like `{{year}}`), by passing in
  // `null` as the date arg.

  const useDate = date !== null;
  const compiledString = template.replace(RegExp(templateVariablePattern, 'g'), (_, key) => {
    let replacement;
    const explicitFieldReplacement = getExplicitFieldReplacement(key, data);

    if (explicitFieldReplacement) {
      replacement = explicitFieldReplacement;
    } else if (dateParsers[key] && !date) {
      missingRequiredDate = true;
      return '';
    } else if (dateParsers[key]) {
      replacement = dateParsers[key](date);
    } else if (key === 'slug') {
      replacement = identifier;
    } else {
      replacement = data.getIn(keyToPathArray(key), '');
    }

    if (processor) {
      return processor(replacement);
    }

    return replacement;
  });

  if (useDate && missingRequiredDate) {
    const err = new Error();
    err.name = SLUG_MISSING_REQUIRED_DATE;
    throw err;
  } else {
    return compiledString;
  }
}

function extractTemplateVars(template) {
  const regexp = RegExp(templateVariablePattern, 'g');
  const contentRegexp = RegExp(templateContentPattern, 'g');
  const matches = template.match(regexp) || [];
  return matches.map(elem => {
    const match = elem.match(contentRegexp);
    return match ? match[0] : '';
  });
}