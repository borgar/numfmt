import { fromDec, roundPlaces } from './dec15.ts';

/**
 * Round a number with plain binary arithmetic, a tie going away from zero.
 * Faster than `round`, but rounds the stored double rather than its 15 digit
 * decimal, so 1.005 rounds to 1.00.
 *
 * Used for vulgar fractions, where this matches Excel better than `round`
 * does: Excel shows 36.305 as "36 30/100".
 *
 * @internal
 * @param number The number to round.
 * @param [places] The number of decimals to round to.
 * @returns A rounded number.
 */
export function roundBinary (number: number, places: number = 0): number {
  if (number < 0) {
    return -roundBinary(-number, places);
  }
  if (places) {
    const p = 10 ** places || 1;
    return Math.round(number * p) / p;
  }
  return Math.round(number);
}

/**
 * Return a number rounded to the specified amount of places. This is the
 * rounding function used internally by the formatter (symmetric arithmetic
 * rounding). It rounds the same way Excel does: the value is first rounded
 * to 15 significant digits, and then to the requested places.
 *
 * @param number The number to round.
 * @param [places] The number of decimals to round to.
 * @returns A rounded number.
 */
export function round (number: number, places: number = 0): number {
  if (typeof number !== 'number') {
    return NaN;
  }
  if (number < 0) {
    return -round(-number, places);
  }
  if (!number || !isFinite(number)) {
    return number;
  }
  return fromDec(...roundPlaces(number, places));
}
