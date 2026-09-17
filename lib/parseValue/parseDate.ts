import { defaultLocale, getLocale } from '../locale.ts';
import { parseDateNf } from './parseDateNf.ts';
import { parseDateXl } from './parseDateXl.ts';
import type { ParseDataNum, ParseValueOptions } from './types.ts';

/**
 * Parse a date or datetime string input and return its value and format. If
 * the input was not recognized or valid, the function returns an `undefined`, for
 * valid input it returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @param value The string to parse
 * @param [options]  Options for the parser
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseDate (value: string, options?: ParseValueOptions): ParseDataNum | undefined {
  const l10n = getLocale(options?.locale || '') || defaultLocale;
  if (options?.mode === 1) {
    return parseDateNf(value, l10n);
  }
  return parseDateXl(value, l10n);
}
