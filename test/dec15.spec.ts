import { describe, expect, test } from 'vitest';
import { roundDigits, toDec15 } from '../src/dec15.ts';

describe('toDec15', () => {
  test('returns 15 digits and the decimal exponent', () => {
    expect(toDec15(1)).toEqual([ 100000000000000, 0 ]);
    expect(toDec15(1234.5)).toEqual([ 123450000000000, 3 ]);
    expect(toDec15(0.001)).toEqual([ 100000000000000, -3 ]);
  });

  test('rounds the exact value, so 1.005 (stored as 1.00499…) becomes 1.005', () => {
    expect(toDec15(1.005)).toEqual([ 100500000000000, 0 ]);
    expect(toDec15(2.5 - 2 ** -51)).toEqual([ 250000000000000, 0 ]);
  });

  test('an exact tie goes toward zero', () => {
    expect(toDec15(10 ** 15 + 5)).toEqual([ 100000000000000, 15 ]);
    expect(toDec15(10 ** 15 + 15)).toEqual([ 100000000000001, 15 ]);
    expect(toDec15(123456789012345.5)).toEqual([ 123456789012345, 14 ]);
    expect(toDec15(99999999999999.25)).toEqual([ 999999999999992, 13 ]);
    expect(toDec15(3 * 2 ** 51 + 1)).toEqual([ 675539944105574, 15 ]);
  });

  test('values just below a power of ten', () => {
    expect(toDec15(999999999999999.5)).toEqual([ 999999999999999, 14 ]);
    expect(toDec15(999999999999999.6)).toEqual([ 100000000000000, 15 ]);
    expect(toDec15(0.9999999999999999)).toEqual([ 100000000000000, 0 ]);
  });

  test('values on both sides of the exact scaling ranges', () => {
    expect(toDec15(1e-8)).toEqual([ 100000000000000, -8 ]);
    expect(toDec15(1.5e-19)).toEqual([ 150000000000000, -19 ]);
    expect(toDec15(Number.MAX_SAFE_INTEGER)).toEqual([ 900719925474099, 15 ]);
    expect(toDec15(2 ** 70)).toEqual([ 118059162071741, 21 ]);
    expect(toDec15(1e37)).toEqual([ 100000000000000, 37 ]);
    expect(toDec15(1e300)).toEqual([ 100000000000000, 300 ]);
    expect(toDec15(Number.MAX_VALUE)).toEqual([ 179769313486232, 308 ]);
  });

  test('subnormal numbers start from their shortest representation', () => {
    expect(toDec15(1e-320)).toEqual([ 100000000000000, -320 ]);
    expect(toDec15(5e-324)).toEqual([ 500000000000000, -324 ]);
    expect(toDec15(2.225073858507201e-308)).toEqual([ 222507385850720, -308 ]);
  });
});

describe('roundDigits', () => {
  test('rounds to the leading digits, a tie going away from zero', () => {
    expect(roundDigits(123450000000000, 4)).toBe(1235);
    expect(roundDigits(123449999999999, 4)).toBe(1234);
    expect(roundDigits(100500000000000, 3)).toBe(101);
  });

  test('returns 10^keep when rounding carries', () => {
    expect(roundDigits(999500000000000, 3)).toBe(1000);
  });

  test('keeps all 15 digits or rounds to nothing', () => {
    expect(roundDigits(123456789012345, 15)).toBe(123456789012345);
    expect(roundDigits(500000000000000, 0)).toBe(1);
    expect(roundDigits(499999999999999, 0)).toBe(0);
    expect(roundDigits(999999999999999, -1)).toBe(0);
  });
});
