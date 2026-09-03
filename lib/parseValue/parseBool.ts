import { defaultLocale, getLocale } from '../locale.ts';
import type { ParseDataBool } from './types.ts';

/**
 * Parse a string input and return its equivalent boolean value. If the input was not
 * recognized or valid, the function returns an `undefined`, for valid input it
 * returns an object with a single property:
 *
 * - `v`: the parsed value.
 *
 * @param value The supposed boolean to parse
 * @param [options] Options for the parser
 * @param [options.locale]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value
 */
export function parseBool (value: string, options: { locale?: string; } = {}): ParseDataBool | undefined {
  const l10n = getLocale(options.locale || '') || defaultLocale;
  const v = value.trim().toLowerCase();
  const bT = l10n.bool[0].toLowerCase();
  if (v === 'true' || v === bT) {
    return { v: true };
  }
  const bF = l10n.bool[1].toLowerCase();
  if (v === 'false' || v === bF) {
    return { v: false };
  }
  return undefined;
}
