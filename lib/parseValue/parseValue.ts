import { defaultLocale, getLocale } from '../locale.ts';
import { parseBoolNf } from './parseBoolNf.ts';
import { parseBoolXl } from './parseBoolXl.ts';
import { parseDateNf } from './parseDateNf.ts';
import { parseDateXl } from './parseDateXl.ts';
import { parseNumberNf } from './parseNumberNf.ts';
import { parseNumberXl } from './parseNumberXl.ts';
import { parseTimeNf } from './parseTimeNf.ts';
import { parseTimeXl } from './parseTimeXl.ts';
import type { ParseDataBool, ParseDataNum, ParseValueOptions } from './types.ts';

/**
 * Attempt to parse a "spreadsheet input" string input and return its value and
 * format. If the input was not recognized or valid, the function returns an
 * `undefined`, for valid input it returns an object with two properties:
 *
 * - `v`: The parsed value. For dates, this will be an Excel style serial date.
 * - `z`: (Optionally) the number format string of the input. This property will
 *        not be present if it amounts to the `General` format.
 *
 * `parseValue()` recognizes a wide range of dates and date-times, times,
 * numbers, and booleans. Some examples:
 *
 * ```js
 * // basic number
 * parseValue("-123");// { v: -123 }
 * // formatted number
 * parseValue("$1,234"); // { v: 1234, z: "$#,##0" }
 * // a percent
 * parseValue("12.3%"); // { v: 0.123, z: "0.00%" }
 * // a date
 * parseValue("07 October 1984"); // { v: 30962, z: 'dd mmmm yyyy' }
 * // an ISO formatted date-time
 * parseValue("1984-09-10 11:12:13.1234"); // { v: 30935.46681855787, z: "yyyy-mm-dd hh:mm:ss" }
 * // a boolean
 * parseValue("false"); // { v: false }
 * ```
 *
 * The formatting string outputted may not correspond exactly to the input.
 * Rather, is it composed of certain elements which the input controls. This is
 * comparable to how Microsoft Excel and Google Sheets parse pasted input. Some
 * things you may expect:
 *
 * - Whitespace is ignored.
 * - Decimal fractions are always represented by `.00` regardless of how many
 *   digits were shown in the input.
 * - Negatives denoted by parentheses [`(1,234)`] will not include the
 *   parentheses in the format string (the value will still be negative.)
 * - All "scientific notation" returns the same format: `0.00E+00`.
 *
 * Internally the parser calls, `parseNumber`, `parseDate`,
 * `parseTime` and `parseBool`. They work in the same way except
 * with a more limited scope. You may prefer those functions if you are limiting
 * input to a smaller scope.
 *
 * @param value The value to parse
 * @param [options] Options for the parser
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseValue (value: string, options?: ParseValueOptions): ParseDataNum | ParseDataBool | undefined {
  const l10n = getLocale(options?.locale || '') || defaultLocale;
  if (options?.mode === 1) {
    return (
      parseNumberNf(value, l10n) ??
      parseDateNf(value, l10n) ??
      parseTimeNf(value, l10n) ??
      parseBoolNf(value, l10n)
    );
  }
  return (
    parseNumberXl(value, l10n) ??
    parseDateXl(value, l10n) ??
    parseTimeXl(value, l10n) ??
    parseBoolXl(value, l10n)
  );
}
