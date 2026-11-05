import { describe, expect, test } from 'vitest';
import { format } from '../src/index.ts';

const SCI = '0.000E+000';

// A subnormal double is k × 2^-1074, with 0 < k < 2^52. Each k here was checked in Excel 16.116.
const k = (n: number) => n * Number.MIN_VALUE;
const FROM_CUT_UP = [
  2 ** 51, // 2^-1023
  2 ** 50,
  0x33802fd28b3c3, // EXP(-710)
  0x1800000000001,
  0x12f230f75fe3f, // EXP(-711)
  2 ** 48 + 1,
  2 ** 48 // 2^-1026
];
const BELOW_CUT = [
  2 ** 48 - 1,
  0xf00000000001,
  0x900000000001,
  2 ** 47,
  0x6f84920bb2d4, // EXP(-712)
  0x993b4dc95, // EXP(-720)
  0x55, // EXP(-740)
  2,
  1 // Number.MIN_VALUE
];

describe('a one-digit scientific pattern on a subnormal number', () => {
  test.each(FROM_CUT_UP)('positive, from 2^-1026 up: %d × 2^-1074', n => {
    expect(format(SCI, k(n))).toBe('0.000E-001');
  });

  test.each(BELOW_CUT)('positive, below 2^-1026: %d × 2^-1074', n => {
    expect(format(SCI, k(n))).toBe('0.000E+000');
  });

  test.each([ ...FROM_CUT_UP, ...BELOW_CUT ])('negative: -%d × 2^-1074', n => {
    expect(format(SCI, -k(n))).toBe('-0.000E-001');
  });

  test('the cut falls between 2^-1026 and its predecessor', () => {
    expect(2 ** 48 * Number.MIN_VALUE).toBe(2 ** -1026);
    expect(format(SCI, 2 ** -1026)).toBe('0.000E-001');
    expect(format(SCI, 2 ** -1026 - Number.MIN_VALUE)).toBe('0.000E+000');
  });

  test('other patterns follow the checked one', () => {
    expect(format('0.00E+00', k(2 ** 48))).toBe('0.00E-01');
    expect(format('0.00E+00', k(2))).toBe('0.00E+00');
    expect(format('0.00E+00', -k(2))).toBe('-0.00E-01');
    expect(format('0E+0', k(2 ** 48))).toBe('0E-1');
    expect(format('0E+0', -k(2))).toBe('-0E-1');
    expect(format('0E-0', k(2))).toBe('0E0');
    expect(format('0E-0', -k(2))).toBe('-0E-1');
    expect(format('#.##E+00', k(2 ** 48))).toBe('0.E-01');
    expect(format('#.##E+00', k(2))).toBe('0.E+00');
    expect(format('.000E+000', -k(2))).toBe('-.000E-001');
    expect(format('0.000E+000;(0.000E+000)', -k(2))).toBe('(0.000E-001)');
    // the largest subnormal, the one next to 2^-1022
    expect(format(SCI, 2 ** -1022 - Number.MIN_VALUE)).toBe('0.000E-001');
    expect(format(SCI, Number.MIN_VALUE - 2 ** -1022)).toBe('-0.000E-001');
  });

  test('engineering and scaled patterns are unchanged', () => {
    expect(format('##0.0E+0', 1e-320)).toBe('10.0E-321');
    expect(format('##0.0E+0', -1e-320)).toBe('-10.0E-321');
    expect(format('0.000E+000%', 1e-310)).toBe('0.000E+000%');
    expect(format('0.000E+000%', -1e-310)).toBe('0.000E+000%');
  });
});

describe('numbers that are not subnormal keep their digits', () => {
  test('zero', () => {
    expect(format(SCI, 0)).toBe('0.000E+000');
    expect(format(SCI, -0)).toBe('0.000E+000');
    expect(format('General', 0)).toBe('0');
    expect(format('General', -0)).toBe('0');
  });

  test('2^-1022, the smallest normal number', () => {
    expect(format(SCI, 2 ** -1022)).toBe('2.225E-308');
    expect(format(SCI, -(2 ** -1022))).toBe('-2.225E-308');
    expect(format(SCI, 2 ** -1022 + Number.MIN_VALUE)).toBe('2.225E-308');
    expect(format('General', 2 ** -1022)).toBe('2.2251E-308');
    expect(format('General', -(2 ** -1022))).toBe('-2.2251E-308');
  });

  test('larger numbers', () => {
    expect(format(SCI, 2)).toBe('2.000E+000');
    expect(format(SCI, -2)).toBe('-2.000E+000');
    expect(format(SCI, 0.5)).toBe('5.000E-001');
    expect(format(SCI, -0.5)).toBe('-5.000E-001');
    expect(format(SCI, 1e-300)).toBe('1.000E-300');
    expect(format(SCI, 1e300)).toBe('1.000E+300');
    expect(format('0E+0', 2.5e-305)).toBe('3E-305');
    expect(format('General', 2)).toBe('2');
    expect(format('General', -2)).toBe('-2');
    expect(format('General', 1e-300)).toBe('1E-300');
    expect(format('General', -1.5e-300)).toBe('-1.5E-300');
  });
});

describe('patterns with no exponent are unchanged', () => {
  test('digits and sign', () => {
    expect(format('0', k(2 ** 48))).toBe('0');
    expect(format('0', -k(2 ** 48))).toBe('0');
    expect(format('0.0', k(2))).toBe('0.0');
    expect(format('0.0', -k(2))).toBe('0.0');
    expect(format('0.00%', -k(2))).toBe('0.00%');
  });
});
