/* globals process */
/* eslint-disable no-loss-of-precision */
import { expect, test } from 'vitest';
import { getTimeZoneName, getTimeZoneOffset } from './utils.ts';
import { format as numfmt, isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.js';

test('near zero negatives:', () => {
  expect(numfmt('-0', -1)).toBe('--1');
  expect(numfmt('-general', -1)).toBe('--1');
  expect(() => numfmt('0.0 general'), '0.0 general').toThrow();
  expect(numfmt('0.0', -1)).toBe('-1.0');
  expect(numfmt('0.0', -0.1)).toBe('-0.1');
  expect(numfmt('-0.0', -0.01)).toBe('-0.0');
  expect(numfmt('0.0', -0.01)).toBe('0.0');
  expect(numfmt(' - 0.0', -0.01)).toBe(' - 0.0');
  expect(numfmt(' - 0.0', -1)).toBe('- - 1.0');
  expect(numfmt('0.0;-0.0', -0.01)).toBe('-0.0');
  expect(numfmt('# ?/?', -0.01)).toBe('-0    ');
  expect(numfmt('\\p\\o\\s 0.0;\\n\\e\\g 0.0;', -0.01)).toBe('neg 0.0');
});

test('scaling should not mess number up:', () => {
  expect(numfmt('0.0%', 0.0295)).toBe('3.0%');
  expect(numfmt('0.0,', 2950)).toBe('3.0');
  expect(numfmt('0%', 0)).toBe('0%');
});

test('Misc input:', () => {
  expect(numfmt('0', undefined)).toBe('');
  expect(numfmt('0', null)).toBe('');
  expect(numfmt('0', NaN)).toBe('NaN');
  expect(numfmt('0', Infinity)).toBe('∞');
  expect(numfmt('0', -Infinity)).toBe('-∞');
  expect(numfmt('0', true)).toBe('TRUE');
  expect(numfmt('0', false)).toBe('FALSE');
});

test('isDate:', () => {
  expect(isDateFormat('y'), 'isDate(y)').toBe(true);
  expect(isDateFormat('#;y'), 'isDate(#;y)').toBe(true);
  expect(isDateFormat('"y"'), 'isDate("y")').toBe(false);
  expect(isDateFormat('#;"y"'), 'isDate(#;"y")').toBe(false);
  expect(isDateFormat('\\y'), 'isDate(\\y)').toBe(false);
  expect(isDateFormat('#;\\y'), 'isDate(#;\\y)').toBe(false);
  expect(isDateFormat('#'), 'isDate(#)').toBe(false);
  expect(isDateFormat('@'), 'isDate(@)').toBe(false);
  expect(isDateFormat(''), 'isDate()').toBe(false);
});

test('isPercent:', () => {
  expect(isPercentFormat('0%'), 'isPercent(0%)').toBe(true);
  expect(isPercentFormat('#%'), 'isPercent(#%)').toBe(true);
  expect(isPercentFormat('#;#%'), 'isPercent(#;#%)').toBe(true);
  expect(isPercentFormat('%'), 'isPercent(%)').toBe(true);
  expect(isPercentFormat('#"%"'), 'isPercent(#"%")').toBe(false);
  expect(isPercentFormat('#\\%'), 'isPercent(#\\%)').toBe(false);
  expect(isPercentFormat('@'), 'isPercent(@)').toBe(false);
  expect(isPercentFormat(''), 'isPercent()').toBe(false);
});

test('isText:', () => {
  expect(isTextFormat('0%'), 'isText(0%)').toBe(false);
  expect(isTextFormat('#%'), 'isText(#%)').toBe(false);
  expect(isTextFormat('#;#%'), 'isText(#;#%)').toBe(false);
  expect(isTextFormat('%'), 'isText(%)').toBe(false);
  expect(isTextFormat('#"%"'), 'isText(#"%")').toBe(false);
  expect(isTextFormat('#\\%'), 'isText(#\\%)').toBe(false);
  expect(isTextFormat(''), 'isText()').toBe(false);
  expect(isTextFormat('@'), 'isText(@)').toBe(true);
  expect(isTextFormat('[blue]@'), 'isText([blue]@)').toBe(true);
  expect(isTextFormat('#;@'), 'isText(#;@)').toBe(false);
  expect(isTextFormat('#;#;@'), 'isText(#;#;@)').toBe(false);
  expect(isTextFormat('#;#;#;@'), 'isText(#;#;#;@)').toBe(false);
});

test('Date object as a value:', () => {
  process.env.TZ = 'Etc/UTC';
  expect(getTimeZoneName()).toBe('Coordinated Universal Time');

  expect(numfmt('0.######', new Date(1900, 1 - 1, 0))).toBe('0.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 1))).toBe('1.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 2))).toBe('2.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 3))).toBe('3.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 4))).toBe('4.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 5))).toBe('5.');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 20))).toBe('20.');
  expect(numfmt('0.######', new Date(1900, 2 - 1, 1))).toBe('32.');
  expect(numfmt('0.######', new Date(1900, 2 - 1, 28)), 'new Date(1900, 2 - 1, 28, 0, 0, 0)').toBe('59.');
  // 1900-02-29 (serial number 60) is a date that only exists in Excel
  expect(numfmt('0.######', new Date(1900, 3 - 1, 1)), 'new Date(1900, 3 - 1, 1, 0, 0, 0)').toBe('61.');
  expect(numfmt('0.######', new Date(1900, 3 - 1, 2)), 'new Date(1900, 3 - 1, 2, 0, 0, 0)').toBe('62.');
  expect(numfmt('0.######', new Date(1900, 3 - 1, 3)), 'new Date(1900, 3 - 1, 3, 0, 0, 0)').toBe('63.');
  expect(numfmt('0.######', new Date(2000, 10 - 1, 10))).toBe('36809.');
  expect(numfmt('0.######', new Date(2100, 10 - 1, 30))).toBe('73353.');
  expect(numfmt('0.######', new Date(2004, 2 - 1, 29))).toBe('38046.');
  expect(numfmt('0.######', new Date(2020, 2 - 1, 29))).toBe('43890.');
  expect(numfmt('0.######', new Date(2000, 5 - 1, 9, 1, 0, 0))).toBe('36655.041667');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 1, 0, 0))).toBe('0.041667');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 0, 1, 0))).toBe('0.000694');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 0, 0, 1))).toBe('0.000012');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 23, 0, 0))).toBe('0.958333');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 0, 59, 0))).toBe('0.040972');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 0, 0, 59))).toBe('0.000683');
  expect(numfmt('0.######', new Date(1900, 1 - 1, 0, 23, 59, 59))).toBe('0.999988');
  expect(numfmt('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5))).toBe('3290.127836');
  expect(numfmt('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5))).toBe('3290.127836');
  // these were yielding "Sep 0, 2020"
  expect(numfmt('MMM D, YYYY', new Date(2020, 8 - 1, 31, 13, 3, 0))).toBe('Aug 31, 2020');
  expect(numfmt('MMM D, YYYY', new Date(Date.parse('2020-08-31T02:42:00.1')))).toBe('Aug 31, 2020');

  // test ignoreTimezone
  const testYMD = (y: number, m: number, d: number) => {
    const dt = new Date(y, m, d);
    const tzSkew = getTimeZoneOffset(dt) / (60 * 24);
    const output = numfmt('General', dt, { ignoreTimezone: true });
    const diff = Number(output.replace(/^\d*(\.\d*)?$/, '0$1')) - tzSkew;
    return Math.abs(diff);
  };

  expect(testYMD(1900, 0, 0) < 0.00001, '1900 [ignoreTimezone]').toBeTruthy();
  expect(testYMD(1950, 0, 0) < 0.00001, '1950 [ignoreTimezone]').toBeTruthy();
  expect(testYMD(2000, 0, 0) < 0.00001, '2000 [ignoreTimezone]').toBeTruthy();
});

test('Significant digits truncation:', () => {
  expect(numfmt('General', 3300.0000000000005)).toBe('3300');
  expect(numfmt('General', -33000.000000000001)).toBe('-33000');
});

test('Order of operators in fractions doesn\'t matter:', () => {
  // 0 after #
  expect(numfmt('#.##0', -10.29)).toBe('-10.290');
  expect(numfmt('#.###0', -10.29)).toBe('-10.290');
  expect(numfmt('#.####0', -10.29)).toBe('-10.290');
  expect(numfmt('#.###000', -10.29)).toBe('-10.29000');
  expect(numfmt('#.#0#0#0', -10.29)).toBe('-10.2900');
  expect(numfmt('#.#00', 1)).toBe('1.00');
  expect(numfmt('#.####0', 1)).toBe('1.0');
  expect(numfmt('#.###000', 1)).toBe('1.000');
  expect(numfmt('#.#0#0#0', 1)).toBe('1.000');
  expect(numfmt('#.##0', 0.01)).toBe('.010');
  expect(numfmt('#.###0', 0.01)).toBe('.010');
  expect(numfmt('#.#00', 0.01)).toBe('.010');
  expect(numfmt('#.####0', 0.0001)).toBe('.00010');
  expect(numfmt('#.#00', 0.0001)).toBe('.00');
  expect(numfmt('#.#0', 0.1)).toBe('.10');
  expect(numfmt('#.##0', 0.1)).toBe('.10');
  expect(numfmt('#.###0', 0.1)).toBe('.10');
  // 0 after ?
  expect(numfmt('#.?00', 1)).toBe('1. 00');
  expect(numfmt('#.?0', 0.0001)).toBe('. 0');
  expect(numfmt('#.????0', -10.29)).toBe('-10.29  0');
  expect(numfmt('#.????0', 0.01)).toBe('.01  0');
  // split pattern
  expect(numfmt('#.#x#0', 1)).toBe('1.x0');
  expect(numfmt('#.#x#0', 0.1)).toBe('.1x0');
  expect(numfmt('#.??x?0', 0.01)).toBe('.01x 0');
});

test('Order of operators in integers doesn\'t matter:', () => {
  expect(numfmt('0#', 0)).toBe('0');
  expect(numfmt('0?', 0)).toBe('0 ');
  expect(numfmt('0#0#', 0)).toBe('00');
  expect(numfmt('0?0?', 0)).toBe('0 0 ');
});

test('Automatic minus injection for the third condition:', () => { // issue #27
  expect(numfmt('[>=100]#,##0;[<=-100]-#,##0;#,##0.00', -3.96)).toBe('-3.96');
  expect(numfmt('[>=100]#,##0;[<=-100]-#,##0;-#,##0.00', -3.96)).toBe('--3.96');
  expect(numfmt('[>=100]0;[<=-100]-0;"xx"0', -10)).toBe('-xx10');
  expect(numfmt('[<=-100]-0;"xx"0', -10)).toBe('xx10');
});

test('Excel ignores extra , in fractions:', () => { // issue #22
  expect(numfmt('#.##0,00', 0)).toBe('.000');
  expect(numfmt('#.##0,0,0', 0)).toBe('.000');
});

test.skip('Order of operators in exponential notation does not matter:', () => {
  expect(numfmt('0?.?0E+1', 0)).toBe('00. 0E+1');
  expect(numfmt('0?.?0E+0', 0)).toBe('00. 0E+0');
});

test.skip('Digits following denominator are padding', () => {
  expect(numfmt('00 00/0z0', 12345.67)).toBe('12345 02/3z0');
  expect(numfmt('00 00/0 0', 12345.67)).toBe('12345 02/3 0');
  expect(numfmt('00 00/? ?', 12345.67)).toBe('12345 02/3  ');
  expect(numfmt('00 00/# #', 12345.67)).toBe('12345 02/3 0');
});

test('Integer gets injected if not present:', () => {
  expect(numfmt('.0', 1234)).toBe('1234.0');
  expect(numfmt(' .0', 1234)).toBe(' 1234.0');
  expect(numfmt('x.0', 1234)).toBe('x1234.0');
  expect(numfmt(' . 0', 1234)).toBe(' 1234. 0');
  expect(numfmt('0 0/0', 1234)).toBe('1234 0/1');
  expect(numfmt('0/0', 1234)).toBe('1234/1');
});

test('Padding:', () => {
  expect(numfmt('0', 1)).toBe('1');
  expect(numfmt('0?', 1)).toBe('01');
  expect(numfmt('0??', 1)).toBe('0 1');
  expect(numfmt('0???', 1)).toBe('0  1');
  expect(numfmt('0????', 1)).toBe('0   1');
  expect(numfmt('0', 0)).toBe('0');
  expect(numfmt('0?', 0)).toBe('0 ');
  expect(numfmt('0??', 0)).toBe('0  ');
  expect(numfmt('0???', 0)).toBe('0   ');
  expect(numfmt('0????', 0)).toBe('0    ');
  expect(numfmt('0', 1)).toBe('1');
  expect(numfmt('0#', 1)).toBe('01');
  expect(numfmt('0##', 1)).toBe('01');
  expect(numfmt('0###', 1)).toBe('01');
  expect(numfmt('0####', 1)).toBe('01');
  expect(numfmt('0', 0)).toBe('0');
  expect(numfmt('0#', 0)).toBe('0');
  expect(numfmt('0##', 0)).toBe('0');
  expect(numfmt('0###', 0)).toBe('0');
  expect(numfmt('0####', 0)).toBe('0');

  expect(numfmt('0,', 1)).toBe('0');
  expect(numfmt('0,?', 1)).toBe('01');
  expect(numfmt('0,??', 1)).toBe('0 1');
  expect(numfmt('0,???', 1)).toBe('0,  1');
  expect(numfmt('0,????', 1)).toBe('0    1');
  expect(numfmt('0,', 0)).toBe('0');
  expect(numfmt('0,?', 0)).toBe('0 ');
  expect(numfmt('0,??', 0)).toBe('0  ');
  expect(numfmt('0,???', 0)).toBe('0,   ');
  expect(numfmt('0,????', 0)).toBe('0     ');

  expect(numfmt('.0', 1)).toBe('1.0');
  expect(numfmt('.?0', 1)).toBe('1. 0');
  expect(numfmt('.??0', 1)).toBe('1.  0');
  expect(numfmt('.???0', 1)).toBe('1.   0');
  expect(numfmt('.????0', 1)).toBe('1.    0');
  expect(numfmt('.0', 0)).toBe('.0');
  expect(numfmt('.?0', 0)).toBe('. 0');
  expect(numfmt('.??0', 0)).toBe('.  0');
  expect(numfmt('.???0', 0)).toBe('.   0');
  expect(numfmt('.????0', 0)).toBe('.    0');
  expect(numfmt('.0', 1)).toBe('1.0');
  expect(numfmt('.#0', 1)).toBe('1.0');
  expect(numfmt('.##0', 1)).toBe('1.0');
  expect(numfmt('.###0', 1)).toBe('1.0');
  expect(numfmt('.####0', 1)).toBe('1.0');
  expect(numfmt('.0', 0)).toBe('.0');
  expect(numfmt('.#0', 0)).toBe('.0');
  expect(numfmt('.##0', 0)).toBe('.0');
  expect(numfmt('.###0', 0)).toBe('.0');
  expect(numfmt('.####0', 0)).toBe('.0');
});

test('Tokenizer is not case sensitive:', () => {
  expect(numfmt('mmmm', 1234)).toBe('May');
  expect(numfmt('MMMM', 1234)).toBe('May');
  expect(numfmt('Mmmm', 1234)).toBe('May');
  expect(numfmt('MmMm', 1234)).toBe('May');
  expect(numfmt('dddd', 1234)).toBe('Monday');
  expect(numfmt('DDDD', 1234)).toBe('Monday');
  expect(numfmt('Dddd', 1234)).toBe('Monday');
  expect(numfmt('dDdD', 1234)).toBe('Monday');
});

test('Comma resolution test:', () => {
  expect(numfmt('#,,"M"', 6000000)).toBe('6M');
  expect(numfmt('#,,"M";', 6000000)).toBe('6M');
  expect(numfmt('#,,"M";#,,"M";0', 6000000)).toBe('6M');
});

test('Issue #64 (very small number):', () => {
  expect(numfmt('0.000E+000', 2.33e-32)).toBe('2.330E-032');
  expect(numfmt('0.000E+000', 2.33e-321)).toBe('2.330E-321');
  expect(numfmt('0.000E+000', 2.33e+307)).toBe('2.330E+307');
  expect(numfmt('0.000E+000', 2.33e+309)).toBe('∞');

  expect(numfmt('General', 2.33e-321)).toBe('2.33E-321');
  expect(numfmt('0.0', 2.33e-321)).toBe('0.0');
});
