/**
 * The numfmt library formats numbers according to a specifier string as defined in ECMA-376.
 * The library tries its best to emulate the inns and outs of what the Excel spreadsheet
 * software does.
 *
 * @packageDocumentation
 * @module numfmt
 */

import { TOKEN_ERROR } from './constants.ts';

export {
  getLocale,
  parseLocale,
  addLocale
} from './locale.ts';

import { defaultOptions, type FormatOptions } from './options.ts';

export { round } from './round.ts';
export type { FormatOptions } from './options.ts';
export type { ParseDataBool, ParseDataNum } from './parseValue.ts';
export type {
  TokenType,
  Token,
  FormatDateInfo,
  FormatInfo
} from './types.ts';
/**
 * @ignore
 */
export type {
  TOKEN_GENERAL, TOKEN_HASH, TOKEN_ZERO, TOKEN_QMARK, TOKEN_SLASH, TOKEN_GROUP, TOKEN_SCALE, TOKEN_COMMA, TOKEN_BREAK,
  TOKEN_TEXT, TOKEN_PLUS, TOKEN_MINUS, TOKEN_POINT, TOKEN_SPACE, TOKEN_PERCENT, TOKEN_DIGIT, TOKEN_CALENDAR,
  TOKEN_ERROR, TOKEN_DATETIME, TOKEN_DURATION, TOKEN_CONDITION, TOKEN_DBNUM, TOKEN_NATNUM, TOKEN_LOCALE, TOKEN_COLOR,
  TOKEN_MODIFIER, TOKEN_AMPM, TOKEN_ESCAPED, TOKEN_STRING, TOKEN_SKIP, TOKEN_EXP, TOKEN_FILL, TOKEN_PAREN, TOKEN_CHAR
} from './constants.ts';

import { dateToSerial as handleDates } from './serialDate.ts';
export { dateToSerial, dateFromSerial } from './serialDate.ts';

export type { LocaleData, LocaleToken } from './locale.ts';

export {
  parseNumber,
  parseDate,
  parseTime,
  parseBool,
  parseValue
} from './parseValue.ts';

import { formatColor as fmtColor, formatValue as fmtValue } from './formatNumber.ts';
import { info, dateInfo, isDate, isPercent, isText } from './formatInfo.ts';
import { parsePattern } from './parsePattern.ts';
import type { FormatDateInfo, FormatInfo } from './types.ts';

export { tokenize } from './tokenize.ts';

const _parseDataCache = Object.create({});
function prepareFormatterData (pattern: string, shouldThrow = false) {
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
      const message = err && typeof err === 'object' && 'message' in err ? err.message : 'Unknown error';
      const errPart = {
        tokens: [ { type: TOKEN_ERROR } ],
        error: message
      };
      parseData = {
        pattern: pattern,
        partitions: [ errPart, errPart, errPart, errPart ],
        error: message,
        locale: null
      };
    }
  }
  return parseData;
}

/**
 * Formats a value as a string and returns the result.
 *
 * - Dates are normalized to spreadsheet style serial dates and then formatted.
 * - Booleans are emitted as uppercase `TRUE` or `FALSE`.
 * - `null` and `undefined` will return an empty string `""`.
 * - Any non number values will be stringified and passed through the text section of the format pattern.
 * - `NaN`s and `Infinite`s will use the corresponding strings from the active locale.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}]  Formatter options

 * @returns A formatted value
 */
export function format (
  pattern: string,
  value: any,
  options: Partial<FormatOptions> = {}
): string {
  const opts: FormatOptions = Object.assign({}, defaultOptions, options);
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
 * console.log(color); // undefined
 * ```
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}] Formatter options
 * @param [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 *    `true` by default.
 * @param [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 *    `false` by default.
 * @param [options.indexColors=true]
 *    When indexed color modifiers are used (`[Color 1]`) the formatter will
 *    convert the index into the corresponding hex color of the default palette.
 *    When this option is set to false, the number will instead by emitted
 *    allowing you to index against a custom palette.
 *    `true` by default.
 * @returns
 *    A string color value as described by the pattern or a number if the
 *    indexColors option has been set to false.
 */
export function formatColor (
  pattern: string,
  value: any,
  options?: {
    throws?: boolean;
    ignoreTimezone?: boolean;
    indexColors?: boolean;
  }
): string | number | undefined {
  const opts = Object.assign({}, defaultOptions, options);
  const data = prepareFormatterData(pattern, opts.throws);
  const val = handleDates(value, opts) ?? value;
  return fmtColor(val, data, opts);
}

/**
 * Determine if a given format pattern is a date pattern.
 *
 * The pattern is considered a date pattern if any of its sections (`"a;b;c;d"`)
 * contains a date operator (such as `Y` or `H`). Each section is restricted to be
 * _either_ a number or date format.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
export function isDateFormat (pattern: string): boolean {
  const data = prepareFormatterData(pattern, false);
  return isDate(data.partitions);
}

/**
 * Determine if a given format pattern is a percentage pattern.
 *
 * The pattern is considered a percentage pattern if any of its sections (`"a;b;c;d"`)
 * contains an unescaped percentage symbol.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
export function isPercentFormat (pattern: string): boolean {
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
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
export function isTextFormat (pattern: string): boolean {
  const data = prepareFormatterData(pattern, false);
  return isText(data.partitions);
}

/**
 * Determine if a given format pattern is valid.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is valid, False otherwise.
 */
export function isValidFormat (pattern: string): boolean {
  try {
    prepareFormatterData(pattern, true);
    return true;
  }
  catch (err) {
    return false;
  }
}

/**
 * Returns an object detailing the properties and internals of a format parsed
 * format pattern.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @param [options={}]  Options for the method
 * @param [options.currency]
 *   Limit the patterns identified as currency to those that use the give string.
 *   If nothing is provided, patterns will be tagged as currency if one of the
 *   following currency symbols is used: `¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿`
 * @returns An object of format properties.
 */
export function getFormatInfo (pattern: string, options: { currency?: string; } = {}): FormatInfo {
  const data = prepareFormatterData(pattern, false);
  if (!data.info) {
    data.info = info(data.partitions, options?.currency);
  }
  return data.info;
}

/**
 * Gets information about how date codes are used in a format string.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns An object of format date properties.
 */
export function getFormatDateInfo (pattern: string): FormatDateInfo {
  const data = prepareFormatterData(pattern, false);
  if (!data.dateInfo) {
    data.dateInfo = dateInfo(data.partitions);
  }
  return data.dateInfo;
}
