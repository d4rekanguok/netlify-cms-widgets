import moment from 'moment';
import { Map } from 'immutable';
import { selectInferedField } from '../reducers/collections';
import { EntryMap, Collection } from '../types/redux';

// prepends a Zero if the date has only 1 digit
function formatDate(date: number) {
  return `0${date}`.slice(-2);
}

export const dateParsers: Record<string, (date: Date) => string> = {
  year: (date: Date) => `${date.getUTCFullYear()}`,
  month: (date: Date) => formatDate(date.getUTCMonth() + 1),
  day: (date: Date) => formatDate(date.getUTCDate()),
  hour: (date: Date) => formatDate(date.getUTCHours()),
  minute: (date: Date) => formatDate(date.getUTCMinutes()),
  second: (date: Date) => formatDate(date.getUTCSeconds()),
};

export const SLUG_MISSING_REQUIRED_DATE = 'SLUG_MISSING_REQUIRED_DATE';

const FIELD_PREFIX = 'fields.';
const templateContentPattern = '[^}{]+';
const templateVariablePattern = `{{(${templateContentPattern})}}`;

export const keyToPathArray = (key?: string) => {
  if (!key) {
    return [];
  }
  const parts = [];
  const separator = '';
  const chars = key.split(separator);

  let currentChar;
  let currentStr = [];
  while ((currentChar = chars.shift())) {
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
};

// Allow `fields.` prefix in placeholder to override built in replacements
// like "slug" and "year" with values from fields of the same name.
function getExplicitFieldReplacement(key: string, data: Map<string, unknown>) {
  if (!key.startsWith(FIELD_PREFIX)) {
    return;
  }
  const fieldName = key.substring(FIELD_PREFIX.length);
  return data.getIn(keyToPathArray(fieldName), '') as string;
}

export function parseDateFromEntry(entry: EntryMap, collection: Collection, fieldName?: string) {
  const dateFieldName = fieldName || selectInferedField(collection, 'date');
  if (!dateFieldName) {
    return;
  }

  const dateValue = entry.getIn(['data', dateFieldName]);
  const dateMoment = dateValue && moment(dateValue);
  if (dateMoment && dateMoment.isValid()) {
    return dateMoment.toDate();
  }
}

export function compileStringTemplate(
  template: string,
  date: Date | undefined | null,
  identifier = '',
  data = Map<string, unknown>(),
  processor?: (value: string) => string,
) {
  let missingRequiredDate;

  // Turn off date processing (support for replacements like `{{year}}`), by passing in
  // `null` as the date arg.
  const useDate = date !== null;

  const compiledString = template.replace(
    RegExp(templateVariablePattern, 'g'),
    (_, key: string) => {
      let replacement;
      const explicitFieldReplacement = getExplicitFieldReplacement(key, data);

      if (explicitFieldReplacement) {
        replacement = explicitFieldReplacement;
      } else if (dateParsers[key] && !date) {
        missingRequiredDate = true;
        return '';
      } else if (dateParsers[key]) {
        replacement = dateParsers[key](date as Date);
      } else if (key === 'slug') {
        replacement = identifier;
      } else {
        replacement = data.getIn(keyToPathArray(key), '') as string;
      }

      if (processor) {
        return processor(replacement);
      }

      return replacement;
    },
  );

  if (useDate && missingRequiredDate) {
    const err = new Error();
    err.name = SLUG_MISSING_REQUIRED_DATE;
    throw err;
  } else {
    return compiledString;
  }
}

export function extractTemplateVars(template: string) {
  const regexp = RegExp(templateVariablePattern, 'g');
  const contentRegexp = RegExp(templateContentPattern, 'g');
  const matches = template.match(regexp) || [];
  return matches.map(elem => {
    const match = elem.match(contentRegexp);
    return match ? match[0] : '';
  });
}
