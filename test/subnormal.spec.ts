import { describe, expect, test } from 'vitest';
import { format, formatColor } from '../src/index.ts';

const SCI = '0.000E+000';

// A subnormal double is k × 2^-1074, with 0 < k < 2^52. Excel 16.116 Beta for Mac and Excel for
// Windows 16.0.20527.20150 read 0.000E+000 and General on each k here, and the other patterns on
// 2^-1023, EXP(-720) and -EXP(-720), not on every value in these tests.
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

describe('a scientific pattern on a subnormal number', () => {
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

  test('other scientific patterns', () => {
    expect(format('0.00E+00', k(2 ** 48))).toBe('0.00E-01');
    expect(format('0.00E+00', k(2))).toBe('0.00E+00');
    expect(format('0.00E+00', -k(2))).toBe('-0.00E-01');
    expect(format('0E+0', k(2 ** 48))).toBe('0E-1');
    expect(format('0E+0', -k(2))).toBe('-0E-1');
    expect(format('0E-0', k(2))).toBe('0E0');
    expect(format('0E-0', -k(2))).toBe('-0E-1');
    expect(format('#.##E+00', k(2 ** 48))).toBe('0.E-01');
    expect(format('#.##E+00', k(2))).toBe('0.E+00');
    expect(format('#.##E+00', -k(2))).toBe('-0.E-01');
    expect(format('?.0E+0', 2 ** -1023)).toBe('0.0E-1');
    expect(format('?.0E+0', -k(2))).toBe('-0.0E-1');
    expect(format('0.000E+000;(0.000E+000)', -k(2))).toBe('(0.000E-001)');
  });

  test('the largest subnormal', () => {
    expect(format(SCI, 2 ** -1022 - Number.MIN_VALUE)).toBe('0.000E-001');
    expect(format(SCI, Number.MIN_VALUE - 2 ** -1022)).toBe('-0.000E-001');
  });

  test('a negative number in its own section', () => {
    expect(format('0.000E+000;-0.000E+000', -k(2))).toBe('-0.000E-001');
    expect(format('[<0]0.000E+000;0', -k(2))).toBe('0.000E-001');
    expect(format('0.000E+000;(0.000E+000);"zero"', 2 ** -1023)).toBe('0.000E-001');
    expect(format('0.000E+000;(0.000E+000);"zero"', k(2))).toBe('zero');
    expect(formatColor('[Red]0;[Blue]0;[Green]0', k(2))).toBe('green');
    expect(formatColor('[Red]0;[Blue]0;[Green]0', 2 ** -1023)).toBe('red');
    expect(format('0.000E+000;(0.000E+000);"zero"', -k(2))).toBe('(0.000E-001)');
    expect(format('0.000E+000;(0.000E+000)', -(2 ** -1022))).toBe('(2.225E-308)');
  });

  test('engineering patterns write the exponent they give 0.4', () => {
    expect(format('##0.0E+0', 0)).toBe('000.0E+0');
    expect(format('#0.0E+0', 0)).toBe('00.0E+0');
    expect(format('##0.0E+0', 2 ** -1023)).toBe('000.0E-3');
    expect(format('##0.0E+0', 1e-320)).toBe('000.0E+0');
    expect(format('##0.0E+0', -1e-320)).toBe('-000.0E-3');
    expect(format('#0.0E+0', 2 ** -1023)).toBe('00.0E-2');
    expect(format('#0.0E+0', 1e-320)).toBe('00.0E+0');
    expect(format('#0.0E+0', -1e-320)).toBe('-00.0E-2');
  });

  test('a pattern with no integer digit writes the exponent it gives 0.4', () => {
    expect(format('.000E+000', -0.4)).toBe('-.400E+000');
    expect(format('.000E+000', 2 ** -1023)).toBe('.000E+000');
    expect(format('.000E+000', -1e-320)).toBe('-.000E+000');
  });

  test('scaled patterns are not scaled', () => {
    expect(format('0.000E+000%', 2 ** -1023)).toBe('0.000E-001%');
    expect(format('0.000E+000%', 1e-310)).toBe('0.000E+000%');
    expect(format('0.000E+000%', -1e-310)).toBe('-0.000E-001%');
    expect(format('0.000E+000,', 2 ** -1023)).toBe('0.000E-001');
    expect(format('0.000E+000,', 1e-310)).toBe('0.000E+000');
    expect(format('0.000E+000,', -1e-310)).toBe('-0.000E-001');
  });
});

describe('General on a subnormal number', () => {
  test.each([ ...FROM_CUT_UP, ...BELOW_CUT ])('%d × 2^-1074', n => {
    expect(format('General', k(n))).toBe('0');
    expect(format('General', -k(n))).toBe('0');
  });

  test('the largest subnormal', () => {
    expect(format('General', 2 ** -1022 - Number.MIN_VALUE)).toBe('0');
    expect(format('General', Number.MIN_VALUE - 2 ** -1022)).toBe('0');
  });

  test('a negative number in its own section', () => {
    expect(format('General;General', -k(2))).toBe('0');
    expect(format('General;(General)', -k(2))).toBe('0');
  });

  test('a section for 0', () => {
    expect(format('General;(General);"z"', 2 ** -1023)).toBe('0');
    expect(format('General;(General);"z"', 1e-320)).toBe('z');
    expect(format('General;(General);"z"', -1e-320)).toBe('z');
    expect(format('General;(General);"z"', 0)).toBe('z');
    expect(format('General;(General);"z"', -0.4)).toBe('(0.4)');
    expect(format('General;(General);"z"', 0.4)).toBe('0.4');
  });

  test('other patterns with General', () => {
    expect(format('@', -k(2))).toBe('0');
    expect(format('"x"General', -k(2))).toBe('x0');
    expect(format('General;General', -0.4)).toBe('0.4');
  });

  test('a date falls back to General as any negative number does', () => {
    expect(format('yyyy-mm-dd', -1, { dateSpanLarge: false })).toBe('-1');
    expect(format('yyyy-mm-dd', -k(2), { dateSpanLarge: false })).toBe('-0');
  });
});

describe('numbers that are not subnormal', () => {
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

describe('a condition on the first section', () => {
  test('[>0] leaves a literal second section with no minus', () => {
    expect(format('[>0]"p";"n"', 2 ** -1023)).toBe('p');
    expect(format('[>0]"p";"n"', 1e-320)).toBe('n');
    expect(format('[>0]"p";"n"', -1e-320)).toBe('n');
    expect(format('[>0]"p";"n"', 0)).toBe('n');
    expect(format('[>0]"p";"n"', -0.4)).toBe('n');
    expect(format('[>0]"p";"n"', 0.4)).toBe('p');
    expect(format('[>0]0.0E+0;"n"', 2 ** -1023)).toBe('0.0E-1');
    expect(format('[>0]0.0E+0;"n"', 1e-320)).toBe('n');
    expect(format('[>0]0.0E+0;"n"', -1e-320)).toBe('n');
    expect(format('[>0]0.0E+0;"n"', 0)).toBe('n');
    expect(format('[>0]0.0E+0;"n"', -0.4)).toBe('n');
    expect(format('[>0]0.0E+0;"n"', 0.4)).toBe('4.0E-1');
  });
});

describe('a percent sign or thousands comma on a scientific pattern', () => {
  test('does not scale', () => {
    expect(format('0.000E+000%', -0.4)).toBe('-4.000E-001%');
    expect(format('0.000E+000%', 1e-300)).toBe('1.000E-300%');
    expect(format('0.000E+000%', 1e-294)).toBe('1.000E-294%');
    expect(format('0.000E+000,', -0.4)).toBe('-4.000E-001');
  });
});

describe('a fraction pattern on a subnormal number', () => {
  test('writes the text for 0, with a minus if negative', () => {
    expect(format('# ?/?', 2 ** -1023)).toBe('0    ');
    expect(format('# ?/?', -k(2))).toBe('-0    ');
    expect(format('# ?/8', 2 ** -1023)).toBe('0    ');
    expect(format('# ?/8', 1e-320)).toBe('0    ');
    expect(format('# ?/8', -1e-320)).toBe('-0    ');
  });

  test('# 0/0 writes no space where it writes no integer', () => {
    expect(format('# 0/0', 2 ** -1023)).toBe('0/1');
    expect(format('# 0/0', 1e-320)).toBe('0/1');
    expect(format('# 0/0', -1e-320)).toBe('-0/1');
    expect(format('# 0/0', 0)).toBe('0/1');
    expect(format('# 0/0', -0.4)).toBe('-2/5');
    expect(format('# ?/8', -0.4)).toBe('- 3/8');
    expect(format('# 0/0', 1.5)).toBe('1 1/2');
    expect(format('0 0/0', 0.4)).toBe('0 2/5');
  });

  test('with no integer digits writes 1/1', () => {
    expect(format('?/?', 2 ** -1023)).toBe('1/1');
    expect(format('?/?', 1e-320)).toBe('1/1');
    expect(format('?/?', -1e-320)).toBe('-1/1');
    expect(format('?/?', 0)).toBe('0/1');
  });
});

describe('digit patterns with no exponent', () => {
  test('write zero with no sign', () => {
    expect(format('0', k(2 ** 48))).toBe('0');
    expect(format('0', -k(2 ** 48))).toBe('0');
    expect(format('0.0', k(2))).toBe('0.0');
    expect(format('0.0', -k(2))).toBe('0.0');
    expect(format('0.00%', -k(2))).toBe('0.00%');
    expect(format('#,##0.00', 2 ** -1023)).toBe('0.00');
    expect(format('#,##0.00', -k(2))).toBe('0.00');
  });
});
