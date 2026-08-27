import {
  TOKEN_GENERAL, TOKEN_HASH, TOKEN_ZERO, TOKEN_QMARK, TOKEN_SLASH, TOKEN_GROUP, TOKEN_SCALE,
  TOKEN_COMMA, TOKEN_BREAK, TOKEN_TEXT, TOKEN_PLUS, TOKEN_MINUS, TOKEN_POINT, TOKEN_SPACE,
  TOKEN_PERCENT, TOKEN_DIGIT, TOKEN_CALENDAR, TOKEN_ERROR, TOKEN_DATETIME, TOKEN_DURATION,
  TOKEN_CONDITION, TOKEN_DBNUM, TOKEN_NATNUM, TOKEN_LOCALE, TOKEN_COLOR, TOKEN_MODIFIER,
  TOKEN_AMPM, TOKEN_ESCAPED, TOKEN_STRING, TOKEN_SKIP, TOKEN_EXP, TOKEN_FILL, TOKEN_PAREN,
  TOKEN_CHAR
} from './constants.ts';

export {
  getLocale,
  parseLocale,
  addLocale
} from './locale.ts';

import { defaultOptions, type FormatOptions } from './options.ts';

export { round } from './round.ts';
export { dec2frac } from './dec2frac.ts';

import { dateToSerial as handleDates } from './serialDate.ts';
export { dateToSerial, dateFromSerial } from './serialDate.ts';

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
import type { FormatDateInfo, FormatInfo, TokenType } from './types.ts';

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
 * - Booleans are emitted as uppercase "TRUE" or "FALSE".
 * - Null and Undefined will return an empty string "".
 * - Any non number values will be stringified and passed through the text section of the format pattern.
 * - NaNs and infinites will use the corresponding strings from the active locale.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}]  Options
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @param [options.overflow="######"]
 *    The string emitted when a formatter fails to format a date that is out
 *    of bounds.
 * @param [options.invalid="######"]
 *    The string emitted when no-throw mode fails to parse a pattern.
 * @param [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 * @param [options.nbsp=false]
 *    By default the output will use a regular space, but in many cases you
 *    may desire a non-breaking-space instead.
 * @param [options.leap1900=true]
 *    Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
 *    It is a requirement in the Ecma OOXML specification so it is on by default.
 * @param [options.dateErrorThrows=false]
 *    Should the formatter throw an error when trying to format a date that is
 *    out of bounds?
 * @param [options.dateErrorNumber=true]
 *    Should the formatter switch to a General number format when trying to
 *    format a date that is out of bounds?
 * @param [options.bigintErrorNumber=false]
 *    Should the formatter switch to a plain string number format when trying to
 *    format a bigint that is out of bounds?
 * @param [options.dateSpanLarge=true]
 *    Extends the allowed range of dates from Excel bounds (1900–9999) to
 *    Google Sheet bounds (0–99999).
 * @param [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 * @param [options.skipChar='']
 *    When the formatter encounters `_` it normally emits a single space instead
 *    of the `_` and the next character (like Excel TEXT function does). Setting
 *    this to a character will make the formatter emit that followed by the next
 *    one.
 * @param [options.fillChar='']
 *    When the formatter encounters `*` it normally emits nothing instead of the
 *    `*` and the next character (like Excel TEXT function does). Setting this
 *    to a character will make the formatter emit that followed by the next one.
 * @returns A formatted value
 */
export function format (
  pattern: string,
  value: any,
  options: Partial<FormatOptions> = {}
  // {
  //   locale?: string;
  //   overflow?: string;
  //   invalid?: string;
  //   throws?: boolean;
  //   nbsp?: boolean;
  //   leap1900?: boolean;
  //   dateErrorThrows?: boolean;
  //   dateErrorNumber?: boolean;
  //   bigintErrorNumber?: boolean;
  //   dateSpanLarge?: boolean;
  //   ignoreTimezone?: boolean;
  //   skipChar?: boolean;
  //   fillChar?: boolean;
  // } = {}
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
 * console.log(color); // null
 * ```
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}] Options
 * @param [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 * @param [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 * @param [options.indexColors=true]
 *    When indexed color modifiers are used (`[Color 1]`) the formatter will
 *    convert the index into the corresponding hex color of the default palette.
 *    When this option is set to false, the number will instead by emitted
 *    allowing you to index against a custom palette.
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
): string | number | null {
  const opts = Object.assign({}, defaultOptions, options);
  const data = prepareFormatterData(pattern, opts.throws);
  const val = handleDates(value, opts) ?? value;
  return fmtColor(val, data, opts);
}

// FIXME: docs what is a a section?...
/**
 * Determine if a given format pattern is a date pattern.
 *
 * The pattern is considered a date pattern if any of its sections contain a
 * date symbol (such as `Y` or `H`). Each section is restricted to be
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
 * The pattern is considered a percentage pattern if any of its sections
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
 * @param [options={}]  Options
 * @param [options.currency]
 *   Limit the patterns identified as currency to those that use the give string.
 *   If nothing is provided, patterns will be tagged as currency if one of the
 *   following currency symbols is used: ¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿
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
 * Gets information about date codes use in a format string.
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

/**
 * A dictionary of the types used to identify token variants.
 *
 * @property AMPM - AM/PM operator (`AM/PM`, `A/P`)
 * @property BREAK - Semicolon operator indicating a break between format sections (`;`)
 * @property CALENDAR - Calendar modifier (`B2`)
 * @property CHAR - Single non-operator character (`m`)
 * @property COLOR - Color modifier (`[Black]`, `[color 5]`)
 * @property COMMA - Plain non-operator comma (`,`)
 * @property CONDITION - Condition modifier for a section (`[>=10]`)
 * @property DATETIME - Date-time operator (`mmmm`, `YY`)
 * @property DBNUM - Number display modifier (`[DBNum23]`)
 * @property DIGIT - A digit between 1 and 9 (`3`)
 * @property DURATION - Time duration (`[ss]`)
 * @property ERROR - Unidentifiable or illegal character (`Ň`)
 * @property ESCAPED - Escaped character (`\E`)
 * @property EXP - Exponent operator (`E+`)
 * @property FILL - Fill with char operator and operand (`*_`)
 * @property GENERAL - General format operator (`General`)
 * @property GROUP - Number grouping operator (`,`)
 * @property HASH - Hash operator (digit if available) (`#`)
 * @property LOCALE - Locale modifier (`[$-1E020404]`)
 * @property MINUS - Minus sign (`-`)
 * @property MODIFIER - An unidentified modifier (`[Schwarz]`)
 * @property NATNUM - Number display modifier (`[NatNum3]`)
 * @property PAREN - Parenthesis character (`)`)
 * @property PERCENT - Percent operator (`%`)
 * @property PLUS - Plus sign (`+`)
 * @property POINT - Decimal point operator (`.`)
 * @property QMARK - Question mark operator (digit or space if not available) (`?`)
 * @property SCALE - Scaling operator (`,`)
 * @property SKIP - Skip with char operator and operand (`*_`)
 * @property SLASH - Slash operator (`/`)
 * @property SPACE - Space (` `)
 * @property STRING - Quoted string (`"days"`)
 * @property TEXT - Text output operator (`@`)
 * @property ZERO - Zero operator (digit or zero if not available) (`0`)
 * @see tokenize
 */
export const tokenTypes: Readonly<Record<TokenType, TokenType>> = Object.freeze({
  [TOKEN_AMPM]: TOKEN_AMPM,
  [TOKEN_BREAK]: TOKEN_BREAK,
  [TOKEN_CALENDAR]: TOKEN_CALENDAR,
  [TOKEN_CHAR]: TOKEN_CHAR,
  [TOKEN_COLOR]: TOKEN_COLOR,
  [TOKEN_COMMA]: TOKEN_COMMA,
  [TOKEN_CONDITION]: TOKEN_CONDITION,
  [TOKEN_DATETIME]: TOKEN_DATETIME,
  [TOKEN_DBNUM]: TOKEN_DBNUM,
  [TOKEN_DIGIT]: TOKEN_DIGIT,
  [TOKEN_DURATION]: TOKEN_DURATION,
  [TOKEN_ERROR]: TOKEN_ERROR,
  [TOKEN_ESCAPED]: TOKEN_ESCAPED,
  [TOKEN_EXP]: TOKEN_EXP,
  [TOKEN_FILL]: TOKEN_FILL,
  [TOKEN_GENERAL]: TOKEN_GENERAL,
  [TOKEN_GROUP]: TOKEN_GROUP,
  [TOKEN_HASH]: TOKEN_HASH,
  [TOKEN_LOCALE]: TOKEN_LOCALE,
  [TOKEN_MINUS]: TOKEN_MINUS,
  [TOKEN_MODIFIER]: TOKEN_MODIFIER,
  [TOKEN_NATNUM]: TOKEN_NATNUM,
  [TOKEN_PAREN]: TOKEN_PAREN,
  [TOKEN_PERCENT]: TOKEN_PERCENT,
  [TOKEN_PLUS]: TOKEN_PLUS,
  [TOKEN_POINT]: TOKEN_POINT,
  [TOKEN_QMARK]: TOKEN_QMARK,
  [TOKEN_SCALE]: TOKEN_SCALE,
  [TOKEN_SKIP]: TOKEN_SKIP,
  [TOKEN_SLASH]: TOKEN_SLASH,
  [TOKEN_SPACE]: TOKEN_SPACE,
  [TOKEN_STRING]: TOKEN_STRING,
  [TOKEN_TEXT]: TOKEN_TEXT,
  [TOKEN_ZERO]: TOKEN_ZERO
});
