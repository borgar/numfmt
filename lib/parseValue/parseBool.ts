import { defaultLocale, getLocale } from '../locale.ts';
import { parseBoolNf } from './parseBoolNf.ts';
import { parseBoolXl } from './parseBoolXl.ts';
import type { ParseDataBool, ParseValueOptions } from './types.ts';

/**
 * Parse a string input and return its equivalent boolean value. If the input was not
 * recognized or valid, the function returns an `undefined`, for valid input it
 * returns an object with a single property:
 *
 * - `v`: the parsed value.
 *
 * @param value The supposed boolean to parse
 * @param [options] Options for the parser
 * @returns An object of the parsed value
 */
export function parseBool (value: string, options?: ParseValueOptions): ParseDataBool | undefined {
  const l10n = getLocale(options?.locale || '') || defaultLocale;
  if (options?.mode === 1) {
    return parseBoolNf(value, l10n);
  }
  return parseBoolXl(value, l10n);
}
