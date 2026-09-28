import { defaultLocale, getLocale } from '../locale.ts';
import { parseNumberNf } from './parseNumberNf.ts';
import { parseNumberXl } from './parseNumberXl.ts';
import { PARSE_EXCEL_STRICT, PARSE_NUMFMT, type ParseDataNum, type ParseValueOptions } from './types.ts';

/**
 * Parse a numeric string input and return its value and format. If the input
 * was not recognized or valid, the function returns an `undefined`, for valid input
 * it returns an object with two properties:
 *
 * * `v`: the parsed value.
 * * `z`: the number format of the input (if applicable).
 *
 * @param value The number to parse
 * @param [options] Options for the parser
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseNumber (value: string, options?: ParseValueOptions): ParseDataNum | undefined {
  const l10n = getLocale(options?.locale || '') || defaultLocale;
  if (options?.mode === PARSE_NUMFMT) {
    return parseNumberNf(value, l10n);
  }
  else if (options?.mode === PARSE_EXCEL_STRICT) {
    return parseNumberXl(value, l10n);
  }
  return parseNumberXl(value.trim(), l10n);
}
