/* globals process */
/* eslint-disable no-loss-of-precision */
import { test, expect } from 'vitest';
import { assertFormat } from './utils.ts';
import { getTimeZoneName, getTimeZoneOffset } from './utils.ts';
import { format as numfmt, isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.ts';

test('near zero negatives:', () => {
  expect.assertions(12);
  assertFormat('-0', -1, '--1');
  assertFormat('-general', -1, '--1');
  expect(() => numfmt('0.0 general', 0)).toThrow();
  assertFormat('0.0', -1, '-1.0');
  assertFormat('0.0', -0.1, '-0.1');
  assertFormat('-0.0', -0.01, '-0.0');
  assertFormat('0.0', -0.01, '0.0');
  assertFormat(' - 0.0', -0.01, ' - 0.0');
  assertFormat(' - 0.0', -1, '- - 1.0');
  assertFormat('0.0;-0.0', -0.01, '-0.0');
  assertFormat('# ?/?', -0.01, '-0    ');
  assertFormat('\\p\\o\\s 0.0;\\n\\e\\g 0.0;', -0.01, 'neg 0.0');
});

test('scaling should not mess number up:', () => {
  expect.assertions(3);
  assertFormat('0.0%', 0.0295, '3.0%');
  assertFormat('0.0,', 2950, '3.0');
  assertFormat('0%', 0, '0%');
});

test('Misc input:', () => {
  expect.assertions(7);
  assertFormat('0', undefined, '');
  assertFormat('0', null, '');
  assertFormat('0', NaN, 'NaN');
  assertFormat('0', Infinity, '∞');
  assertFormat('0', -Infinity, '-∞');
  assertFormat('0', true, 'TRUE');
  assertFormat('0', false, 'FALSE');
});

test('isDate:', () => {
  expect.assertions(9);
  expect(isDateFormat('y')).toBe(true);
  expect(isDateFormat('#;y')).toBe(true);
  expect(isDateFormat('"y"')).toBe(false);
  expect(isDateFormat('#;"y"')).toBe(false);
  expect(isDateFormat('\\y')).toBe(false);
  expect(isDateFormat('#;\\y')).toBe(false);
  expect(isDateFormat('#')).toBe(false);
  expect(isDateFormat('@')).toBe(false);
  expect(isDateFormat('')).toBe(false);
});

test('isPercent:', () => {
  expect.assertions(8);
  expect(isPercentFormat('0%')).toBe(true);
  expect(isPercentFormat('#%')).toBe(true);
  expect(isPercentFormat('#;#%')).toBe(true);
  expect(isPercentFormat('%')).toBe(true);
  expect(isPercentFormat('#"%"')).toBe(false);
  expect(isPercentFormat('#\\%')).toBe(false);
  expect(isPercentFormat('@')).toBe(false);
  expect(isPercentFormat('')).toBe(false);
});

test('isText:', () => {
  expect.assertions(12);
  expect(isTextFormat('0%')).toBe(false);
  expect(isTextFormat('#%')).toBe(false);
  expect(isTextFormat('#;#%')).toBe(false);
  expect(isTextFormat('%')).toBe(false);
  expect(isTextFormat('#"%"')).toBe(false);
  expect(isTextFormat('#\\%')).toBe(false);
  expect(isTextFormat('')).toBe(false);
  expect(isTextFormat('@')).toBe(true);
  expect(isTextFormat('[blue]@')).toBe(true);
  expect(isTextFormat('#;@')).toBe(false);
  expect(isTextFormat('#;#;@')).toBe(false);
  expect(isTextFormat('#;#;#;@')).toBe(false);
});

test('Date object as a value:', () => {
  expect.assertions(32);
  process.env.TZ = 'Etc/UTC';
  expect(getTimeZoneName()).toBe('Coordinated Universal Time');

  assertFormat('0.######', new Date(1900, 1 - 1, 0), '0.');
  assertFormat('0.######', new Date(1900, 1 - 1, 1), '1.');
  assertFormat('0.######', new Date(1900, 1 - 1, 2), '2.');
  assertFormat('0.######', new Date(1900, 1 - 1, 3), '3.');
  assertFormat('0.######', new Date(1900, 1 - 1, 4), '4.');
  assertFormat('0.######', new Date(1900, 1 - 1, 5), '5.');
  assertFormat('0.######', new Date(1900, 1 - 1, 20), '20.');
  assertFormat('0.######', new Date(1900, 2 - 1, 1), '32.');
  expect(numfmt('0.######', new Date(1900, 2 - 1, 28))).toBe('59.');
  // 1900-02-29 (serial number 60) is a date that only exists in Excel
  expect(numfmt('0.######', new Date(1900, 3 - 1, 1))).toBe('61.');
  expect(numfmt('0.######', new Date(1900, 3 - 1, 2))).toBe('62.');
  expect(numfmt('0.######', new Date(1900, 3 - 1, 3))).toBe('63.');
  assertFormat('0.######', new Date(2000, 10 - 1, 10), '36809.');
  assertFormat('0.######', new Date(2100, 10 - 1, 30), '73353.');
  assertFormat('0.######', new Date(2004, 2 - 1, 29), '38046.');
  assertFormat('0.######', new Date(2020, 2 - 1, 29), '43890.');
  assertFormat('0.######', new Date(2000, 5 - 1, 9, 1, 0, 0), '36655.041667');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 1, 0, 0), '0.041667');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 0, 1, 0), '0.000694');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 0, 0, 1), '0.000012');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 23, 0, 0), '0.958333');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 0, 59, 0), '0.040972');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 0, 0, 59), '0.000683');
  assertFormat('0.######', new Date(1900, 1 - 1, 0, 23, 59, 59), '0.999988');
  assertFormat('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5), '3290.127836');
  assertFormat('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5), '3290.127836');
  // these were yielding "Sep 0, 2020"
  assertFormat('MMM D, YYYY', new Date(2020, 8 - 1, 31, 13, 3, 0), 'Aug 31, 2020');
  assertFormat('MMM D, YYYY', new Date(Date.parse('2020-08-31T02:42:00.1')), 'Aug 31, 2020');

  // test ignoreTimezone
  const testYMD = (y: number, m: number, d: number): number => {
    const dt = new Date(y, m, d);
    const tzSkew = getTimeZoneOffset(dt) / (60 * 24);
    const output = numfmt('General', dt, { ignoreTimezone: true });
    const diff = Number(output.replace(/^\d*(\.\d*)?$/, '0$1')) - tzSkew;
    return Math.abs(diff);
  };

  expect(testYMD(1900, 0, 0) < 0.00001).toBe(true);
  expect(testYMD(1950, 0, 0) < 0.00001).toBe(true);
  expect(testYMD(2000, 0, 0) < 0.00001).toBe(true);
});

test('Significant digits truncation:', () => {
  expect.assertions(2);
  assertFormat('General', 3300.0000000000005, '3300');
  assertFormat('General', -33000.000000000001, '-33000');
});

test('Order of operators in fractions doesn\'t matter:', () => {
  expect.assertions(24);
  // 0 after #
  assertFormat('#.##0', -10.29, '-10.290');
  assertFormat('#.###0', -10.29, '-10.290');
  assertFormat('#.####0', -10.29, '-10.290');
  assertFormat('#.###000', -10.29, '-10.29000');
  assertFormat('#.#0#0#0', -10.29, '-10.2900');
  assertFormat('#.#00', 1, '1.00');
  assertFormat('#.####0', 1, '1.0');
  assertFormat('#.###000', 1, '1.000');
  assertFormat('#.#0#0#0', 1, '1.000');
  assertFormat('#.##0', 0.01, '.010');
  assertFormat('#.###0', 0.01, '.010');
  assertFormat('#.#00', 0.01, '.010');
  assertFormat('#.####0', 0.0001, '.00010');
  assertFormat('#.#00', 0.0001, '.00');
  assertFormat('#.#0', 0.1, '.10');
  assertFormat('#.##0', 0.1, '.10');
  assertFormat('#.###0', 0.1, '.10');
  // 0 after ?
  assertFormat('#.?00', 1, '1. 00');
  assertFormat('#.?0', 0.0001, '. 0');
  assertFormat('#.????0', -10.29, '-10.29  0');
  assertFormat('#.????0', 0.01, '.01  0');
  // split pattern
  assertFormat('#.#x#0', 1, '1.x0');
  assertFormat('#.#x#0', 0.1, '.1x0');
  assertFormat('#.??x?0', 0.01, '.01x 0');
});

test('Order of operators in integers doesn\'t matter:', () => {
  expect.assertions(4);
  assertFormat('0#', 0, '0');
  assertFormat('0?', 0, '0 ');
  assertFormat('0#0#', 0, '00');
  assertFormat('0?0?', 0, '0 0 ');
});

test('Automatic minus injection for the third condition:', () => { // issue #27
  expect.assertions(4);
  assertFormat('[>=100]#,##0;[<=-100]-#,##0;#,##0.00', -3.96, '-3.96');
  assertFormat('[>=100]#,##0;[<=-100]-#,##0;-#,##0.00', -3.96, '--3.96');
  assertFormat('[>=100]0;[<=-100]-0;"xx"0', -10, '-xx10');
  assertFormat('[<=-100]-0;"xx"0', -10, 'xx10');
});

test('Excel ignores extra , in fractions:', () => { // issue #22
  expect.assertions(2);
  assertFormat('#.##0,00', 0, '.000');
  assertFormat('#.##0,0,0', 0, '.000');
});

test.skip('Order of operators in exponential notation does not matter:', () => {
  expect.assertions(2);
  assertFormat('0?.?0E+1', 0, '00. 0E+1');
  assertFormat('0?.?0E+0', 0, '00. 0E+0');
});

test.skip('Digits following denominator are padding', () => {
  expect.assertions(4);
  assertFormat('00 00/0z0', 12345.67, '12345 02/3z0');
  assertFormat('00 00/0 0', 12345.67, '12345 02/3 0');
  assertFormat('00 00/? ?', 12345.67, '12345 02/3  ');
  assertFormat('00 00/# #', 12345.67, '12345 02/3 0');
});

test('Integer gets injected if not present:', () => {
  expect.assertions(6);
  assertFormat('.0', 1234, '1234.0');
  assertFormat(' .0', 1234, ' 1234.0');
  assertFormat('x.0', 1234, 'x1234.0');
  assertFormat(' . 0', 1234, ' 1234. 0');
  assertFormat('0 0/0', 1234, '1234 0/1');
  assertFormat('0/0', 1234, '1234/1');
});

test('Padding:', () => {
  expect.assertions(50);
  assertFormat('0', 1, '1');
  assertFormat('0?', 1, '01');
  assertFormat('0??', 1, '0 1');
  assertFormat('0???', 1, '0  1');
  assertFormat('0????', 1, '0   1');
  assertFormat('0', 0, '0');
  assertFormat('0?', 0, '0 ');
  assertFormat('0??', 0, '0  ');
  assertFormat('0???', 0, '0   ');
  assertFormat('0????', 0, '0    ');
  assertFormat('0', 1, '1');
  assertFormat('0#', 1, '01');
  assertFormat('0##', 1, '01');
  assertFormat('0###', 1, '01');
  assertFormat('0####', 1, '01');
  assertFormat('0', 0, '0');
  assertFormat('0#', 0, '0');
  assertFormat('0##', 0, '0');
  assertFormat('0###', 0, '0');
  assertFormat('0####', 0, '0');

  assertFormat('0,', 1, '0');
  assertFormat('0,?', 1, '01');
  assertFormat('0,??', 1, '0 1');
  assertFormat('0,???', 1, '0,  1');
  assertFormat('0,????', 1, '0    1');
  assertFormat('0,', 0, '0');
  assertFormat('0,?', 0, '0 ');
  assertFormat('0,??', 0, '0  ');
  assertFormat('0,???', 0, '0,   ');
  assertFormat('0,????', 0, '0     ');

  assertFormat('.0', 1, '1.0');
  assertFormat('.?0', 1, '1. 0');
  assertFormat('.??0', 1, '1.  0');
  assertFormat('.???0', 1, '1.   0');
  assertFormat('.????0', 1, '1.    0');
  assertFormat('.0', 0, '.0');
  assertFormat('.?0', 0, '. 0');
  assertFormat('.??0', 0, '.  0');
  assertFormat('.???0', 0, '.   0');
  assertFormat('.????0', 0, '.    0');
  assertFormat('.0', 1, '1.0');
  assertFormat('.#0', 1, '1.0');
  assertFormat('.##0', 1, '1.0');
  assertFormat('.###0', 1, '1.0');
  assertFormat('.####0', 1, '1.0');
  assertFormat('.0', 0, '.0');
  assertFormat('.#0', 0, '.0');
  assertFormat('.##0', 0, '.0');
  assertFormat('.###0', 0, '.0');
  assertFormat('.####0', 0, '.0');
});

test('Tokenizer is not case sensitive:', () => {
  expect.assertions(8);
  assertFormat('mmmm', 1234, 'May');
  assertFormat('MMMM', 1234, 'May');
  assertFormat('Mmmm', 1234, 'May');
  assertFormat('MmMm', 1234, 'May');
  assertFormat('dddd', 1234, 'Monday');
  assertFormat('DDDD', 1234, 'Monday');
  assertFormat('Dddd', 1234, 'Monday');
  assertFormat('dDdD', 1234, 'Monday');
});

test('Comma resolution test:', () => {
  expect.assertions(3);
  assertFormat('#,,"M"', 6000000, '6M');
  assertFormat('#,,"M";', 6000000, '6M');
  assertFormat('#,,"M";#,,"M";0', 6000000, '6M');
});

test('Issue #64 (very small number):', () => {
  expect.assertions(6);
  assertFormat('0.000E+000', 2.33e-32, '2.330E-032');
  assertFormat('0.000E+000', 2.33e-321, '2.330E-321');
  assertFormat('0.000E+000', 2.33e+307, '2.330E+307');
  assertFormat('0.000E+000', 2.33e+309, '∞');

  assertFormat('General', 2.33e-321, '2.33E-321');
  assertFormat('0.0', 2.33e-321, '0.0');
});
