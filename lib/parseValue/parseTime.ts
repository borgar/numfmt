import { defaultLocale, getLocale } from '../locale.ts';
import { parseTimeNf } from './parseTimeNf.ts';
import { parseTimeXl } from './parseTimeXl.ts';
import type { ParseDataNum, ParseValueOptions } from './types.ts';

/**
 * Parse a time string input and return its value and format. If the input was
 * not recognized or valid, the function returns an `undefined`, for valid input it
 * returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @param value The string to parse
 * @param [options] Options for the parser
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseTime (value: string, options?: ParseValueOptions): ParseDataNum | undefined {
  const l10n = getLocale(options?.locale || '') || defaultLocale;
  if (options?.mode === 1) {
    return parseTimeNf(value, l10n);
  }
  return parseTimeXl(value, l10n);
}
