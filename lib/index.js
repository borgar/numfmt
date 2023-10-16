export {
  getLocale,
  parseLocale,
  addLocale
} from './locale.js';

import { defaultOptions } from './options.js';

export { round } from './round.js';
export { dec2frac } from './dec2frac.js';

import { dateToSerial as handleDates } from './serialDate.js';
export { dateToSerial, dateFromSerial } from './serialDate.js';

export {
  parseNumber,
  parseDate,
  parseTime,
  parseBool,
  parseValue
} from './parseValue.js';

import { formatColor as fmtColor, formatValue as fmtValue } from './formatNumber.js';
import { info, dateInfo, isDate, isPercent, isText } from './formatInfo.js';
import { parsePattern } from './parsePattern.js';

const _parseDataCache = Object.create({});
function prepareFormatterData (pattern, shouldThrow = false) {
  if (!pattern) { pattern = 'General'; }

  let parseData = _parseDataCache[pattern];
  if (!parseData) {
    try {
      parseData = parsePattern(pattern);
      _parseDataCache[pattern] = parseData;
    }
    catch (err) {
      // if the options say to throw errors, then do so
      if (shouldThrow) {
        throw err;
      }
      // else we set the parsedata to error
      const errPart = {
        tokens: [ { type: 'error' } ],
        error: err.message
      };
      parseData = {
        pattern: pattern,
        partitions: [ errPart, errPart, errPart, errPart ],
        error: err.message,
        locale: null
      };
    }
  }
  return parseData;
}

// FIXME: add some text on how input types/NaN are handled
/**
 * Returns a formatted string for the argument value.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @param {*} value - The value to format.
 * @param {object} [options={}]  Options
 * @param {string} [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @param {string} [options.overflow="######"]
 *    The string emitted when a formatter fails to format a date that is out
 *    of bounds.
 * @param {string} [options.invalid="######"]
 *    The string emitted when no-throw mode fails to parse a pattern.
 * @param {boolean} [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 * @param {boolean} [options.nbsp=true]
 *    By default the formatters will use a non-breaking-space rather than a
 *    regular space in output. Setting this to false will make it use regular
 *    spaces instead.
 * @param {boolean} [options.leap1900=true]
 *    Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
 *    It is a requirement in the Ecma OOXML specification so it is on by default.
 * @param {boolean} [options.dateErrorThrows=false]
 *    Should the formatter throw an error when trying to format a date that is
 *    out of bounds?
 * @param {boolean} [options.dateErrorNumber=true]
 *    Should the formatter switch to a General number format when trying to
 *    format a date that is out of bounds?
 * @param {boolean} [options.dateSpanLarge=true]
 *    Extends the allowed range of dates from Excel bounds (1900–9999) to
 *    Google Sheet bounds (0–99999).
 * @param {boolean} [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 * @returns {string} A formatted value
 */
export function format (pattern, value, options = {}) {
  const opts = Object.assign({}, defaultOptions, options);
  const data = prepareFormatterData(pattern, opts.throws);
  const val = handleDates(value, opts) ?? value;
  return fmtValue(val, data, opts);
}

/**
 * Find the color appropriate to a value as dictated by a format pattern.
 * 
 * If the pattern defines colors, this function will emit the color appropriate
 * to the value. If no colors were specified this function returns `undefined`.
 * 
 * ```js
 * const color = formatColor("[green]#,##0;[red]-#,##0", -10);
 * console.log(color); // "red"
 * const color = formatColor("[green]#,##0;-#,##0", -10);
 * console.log(color); // null
 * ```
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @param {*} value - The value to format.
 * @param {object} [options={}]  Options
 * @param {boolean} [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 * @param {boolean} [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 * @returns {string|null} A string color value as described by the pattern.
 */
export function formatColor (pattern, value, options) {
  // #updated-3.0
  const opts = Object.assign({}, defaultOptions, options);
  const data = prepareFormatterData(pattern, opts.throws);
  const val = handleDates(value, opts) ?? value;
  return fmtColor(val, data, opts);
}

// FIXME: what is a a section?...
/**
 * Determine if a given format pattern is a date pattern.
 *
 * The pattern is considered a date pattern if any of its sections contain a
 * date symbol (such as `Y` or `H`). Each section is restricted to be
 * _either_ a number or date format.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @returns {boolean} True if the specified pattern is date pattern, False otherwise.
 */
export function isDateFormat (pattern) {
  const data = prepareFormatterData(pattern, false);
  return isDate(data.partitions);
}

/**
 * Determine if a given format pattern is a percentage pattern.
 * 
 * The pattern is considered a percentage pattern if any of its sections
 * contains an unescaped percentage symbol.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @returns {boolean} True if the specified pattern is date pattern, False otherwise.
 */
export function isPercentFormat (pattern) {
  const data = prepareFormatterData(pattern, false);
  return isPercent(data.partitions);
}

/**
 * Determine if a given format pattern is a text only pattern.
 * 
 * The pattern is considered text only if its definition is composed of a single
 * section that includes that text symbol (`@`).
 * 
 * For example `@` or `@" USD"` are text patterns but `#;@` is not.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @returns {boolean} True if the specified pattern is date pattern, False otherwise.
 */
export function isTextFormat (pattern) {
  const data = prepareFormatterData(pattern, false);
  return isText(data.partitions);
}

/**
 * Returns an object detailing the properties and internals of a format parsed
 * format pattern.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @param {object} [options={}]  Options
 * @param {string} [options.currency]
 *   Limit the patterns identifed as currency to those that use the give string.
 *   If nothing is provided, patterns will be tagged as currency if one of the
 *   following currency symbols is used: ¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿
 * @returns {FormatInfo} An object of format properties.
 */
export function getFormatInfo (pattern, options = {}) {
  const data = prepareFormatterData(pattern, false);
  if (!data.info) {
    data.info = info(data.partitions, options?.currency);
  }
  return data.info;
}

/**
 * Gets information about date codes use in a format string.
 *
 * @param {string} pattern - A format pattern in the ECMA-376 number format.
 * @returns {FormatDateInfo} An object of format date properties.
 */
export function getFormatDateInfo (pattern) {
  const data = prepareFormatterData(pattern, false);
  if (!data.dateInfo) {
    data.dateInfo = dateInfo(data.partitions);
  }
  return data.dateInfo;
}

// FIXME: add a way to read a formatter's locale?
