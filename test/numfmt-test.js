/* globals process */
/* eslint-disable no-loss-of-precision, no-irregular-whitespace */
import test, { getTimeZoneName, getTimeZoneOffset } from './utils.js';
import { format as numfmt, isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.js';

test('near zero negatives:', t => {
  t.format('-0', -1, '--1');
  t.format('-general', -1, '--1');
  t.throws(() => numfmt('0.0 general'), '0.0 general');
  t.format('0.0', -1, '-1.0');
  t.format('0.0', -0.1, '-0.1');
  t.format('-0.0', -0.01, '-0.0');
  t.format('0.0', -0.01, '0.0');
  t.format(' - 0.0', -0.01, ' - 0.0');
  t.format(' - 0.0', -1, '- - 1.0');
  t.format('0.0;-0.0', -0.01, '-0.0');
  t.format('# ?/?', -0.01, '-0    ');
  t.format('\\p\\o\\s 0.0;\\n\\e\\g 0.0;', -0.01, 'neg 0.0');
  t.end();
});

test('scaling should not mess number up:', t => {
  t.format('0.0%', 0.0295, '3.0%');
  t.format('0.0,', 2950, '3.0');
  t.format('0%', 0, '0%');
  t.end();
});

test('Misc input:', t => {
  // eslint-disable-next-line no-undefined
  t.format('0', undefined, '');
  t.format('0', null, '');
  t.format('0', NaN, 'NaN');
  t.format('0', Infinity, '∞');
  t.format('0', -Infinity, '-∞');
  t.format('0', true, 'TRUE');
  t.format('0', false, 'FALSE');
  t.end();
});

test('isDate:', t => {
  t.equal(isDateFormat('y'), true, 'isDate(y)');
  t.equal(isDateFormat('#;y'), true, 'isDate(#;y)');
  t.equal(isDateFormat('"y"'), false, 'isDate("y")');
  t.equal(isDateFormat('#;"y"'), false, 'isDate(#;"y")');
  t.equal(isDateFormat('\\y'), false, 'isDate(\\y)');
  t.equal(isDateFormat('#;\\y'), false, 'isDate(#;\\y)');
  t.equal(isDateFormat('#'), false, 'isDate(#)');
  t.equal(isDateFormat('@'), false, 'isDate(@)');
  t.equal(isDateFormat(''), false, 'isDate()');
  t.end();
});

test('isPercent:', t => {
  t.equal(isPercentFormat('0%'), true, 'isPercent(0%)');
  t.equal(isPercentFormat('#%'), true, 'isPercent(#%)');
  t.equal(isPercentFormat('#;#%'), true, 'isPercent(#;#%)');
  t.equal(isPercentFormat('%'), true, 'isPercent(%)');
  t.equal(isPercentFormat('#"%"'), false, 'isPercent(#"%")');
  t.equal(isPercentFormat('#\\%'), false, 'isPercent(#\\%)');
  t.equal(isPercentFormat('@'), false, 'isPercent(@)');
  t.equal(isPercentFormat(''), false, 'isPercent()');
  t.end();
});

test('isText:', t => {
  t.equal(isTextFormat('0%'), false, 'isText(0%)');
  t.equal(isTextFormat('#%'), false, 'isText(#%)');
  t.equal(isTextFormat('#;#%'), false, 'isText(#;#%)');
  t.equal(isTextFormat('%'), false, 'isText(%)');
  t.equal(isTextFormat('#"%"'), false, 'isText(#"%")');
  t.equal(isTextFormat('#\\%'), false, 'isText(#\\%)');
  t.equal(isTextFormat(''), false, 'isText()');
  t.equal(isTextFormat('@'), true, 'isText(@)');
  t.equal(isTextFormat('[blue]@'), true, 'isText([blue]@)');
  t.equal(isTextFormat('#;@'), false, 'isText(#;@)');
  t.equal(isTextFormat('#;#;@'), false, 'isText(#;#;@)');
  t.equal(isTextFormat('#;#;#;@'), false, 'isText(#;#;#;@)');
  t.end();
});

test('Date object as a value:', t => {
  process.env.TZ = 'Etc/UTC';
  t.equal(getTimeZoneName(), 'Coordinated Universal Time');

  t.format('0.######', new Date(1900, 1 - 1, 0), '0.');
  t.format('0.######', new Date(1900, 1 - 1, 1), '1.');
  t.format('0.######', new Date(1900, 1 - 1, 2), '2.');
  t.format('0.######', new Date(1900, 1 - 1, 3), '3.');
  t.format('0.######', new Date(1900, 1 - 1, 4), '4.');
  t.format('0.######', new Date(1900, 1 - 1, 5), '5.');
  t.format('0.######', new Date(1900, 1 - 1, 20), '20.');
  t.format('0.######', new Date(1900, 2 - 1, 1), '32.');
  t.equal(numfmt('0.######', new Date(1900, 2 - 1, 28)), '59.', 'new Date(1900, 2 - 1, 28, 0, 0, 0)');
  // 1900-02-29 (serial number 60) is a date that only exists in Excel
  t.equal(numfmt('0.######', new Date(1900, 3 - 1, 1)), '61.', 'new Date(1900, 3 - 1, 1, 0, 0, 0)');
  t.equal(numfmt('0.######', new Date(1900, 3 - 1, 2)), '62.', 'new Date(1900, 3 - 1, 2, 0, 0, 0)');
  t.equal(numfmt('0.######', new Date(1900, 3 - 1, 3)), '63.', 'new Date(1900, 3 - 1, 3, 0, 0, 0)');
  t.format('0.######', new Date(2000, 10 - 1, 10), '36809.');
  t.format('0.######', new Date(2100, 10 - 1, 30), '73353.');
  t.format('0.######', new Date(2004, 2 - 1, 29), '38046.');
  t.format('0.######', new Date(2020, 2 - 1, 29), '43890.');
  t.format('0.######', new Date(2000, 5 - 1, 9, 1, 0, 0), '36655.041667');
  t.format('0.######', new Date(1900, 1 - 1, 0, 1, 0, 0), '0.041667');
  t.format('0.######', new Date(1900, 1 - 1, 0, 0, 1, 0), '0.000694');
  t.format('0.######', new Date(1900, 1 - 1, 0, 0, 0, 1), '0.000012');
  t.format('0.######', new Date(1900, 1 - 1, 0, 23, 0, 0), '0.958333');
  t.format('0.######', new Date(1900, 1 - 1, 0, 0, 59, 0), '0.040972');
  t.format('0.######', new Date(1900, 1 - 1, 0, 0, 0, 59), '0.000683');
  t.format('0.######', new Date(1900, 1 - 1, 0, 23, 59, 59), '0.999988');
  t.format('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5), '3290.127836');
  t.format('0.######', new Date(1909, 1 - 1, 2, 3, 4, 5), '3290.127836');
  // these were yielding "Sep 0, 2020"
  t.format('MMM D, YYYY', new Date(2020, 8 - 1, 31, 13, 3, 0), 'Aug 31, 2020');
  t.format('MMM D, YYYY', new Date(Date.parse('2020-08-31T02:42:00.1')), 'Aug 31, 2020');

  // test ignoreTimezone
  const testYMD = (y, m, d) => {
    const dt = new Date(y, m, d);
    const tzSkew = getTimeZoneOffset(dt) / (60 * 24);
    const output = numfmt('General', dt, { ignoreTimezone: true });
    const diff = (output.replace(/^\d*(\.\d*)?$/, '0$1')) - tzSkew;
    return Math.abs(diff);
  };

  t.ok(testYMD(1900, 0, 0) < 0.00001, '1900 [ignoreTimezone]');
  t.ok(testYMD(1950, 0, 0) < 0.00001, '1950 [ignoreTimezone]');
  t.ok(testYMD(2000, 0, 0) < 0.00001, '2000 [ignoreTimezone]');

  t.end();
});

test('Significant digits truncation:', t => {
  t.format('General', 3300.0000000000005, '3300');
  t.format('General', -33000.000000000001, '-33000');
  t.end();
});

test('Order of operators in fractions doesn\'t matter:', t => {
  // 0 after #
  t.format('#.##0', -10.29, '-10.290');
  t.format('#.###0', -10.29, '-10.290');
  t.format('#.####0', -10.29, '-10.290');
  t.format('#.###000', -10.29, '-10.29000');
  t.format('#.#0#0#0', -10.29, '-10.2900');
  t.format('#.#00', 1, '1.00');
  t.format('#.####0', 1, '1.0');
  t.format('#.###000', 1, '1.000');
  t.format('#.#0#0#0', 1, '1.000');
  t.format('#.##0', 0.01, '.010');
  t.format('#.###0', 0.01, '.010');
  t.format('#.#00', 0.01, '.010');
  t.format('#.####0', 0.0001, '.00010');
  t.format('#.#00', 0.0001, '.00');
  t.format('#.#0', 0.1, '.10');
  t.format('#.##0', 0.1, '.10');
  t.format('#.###0', 0.1, '.10');
  // 0 after ?
  t.format('#.?00', 1, '1. 00');
  t.format('#.?0', 0.0001, '. 0');
  t.format('#.????0', -10.29, '-10.29  0');
  t.format('#.????0', 0.01, '.01  0');
  // split pattern
  t.format('#.#x#0', 1, '1.x0');
  t.format('#.#x#0', 0.1, '.1x0');
  t.format('#.??x?0', 0.01, '.01x 0');
  t.end();
});

test('Order of operators in integers doesn\'t matter:', t => {
  t.format('0#', 0, '0');
  t.format('0?', 0, '0 ');
  t.format('0#0#', 0, '00');
  t.format('0?0?', 0, '0 0 ');
  t.end();
});

test('Automatic minus injection for the third condition:', t => { // issue #27
  t.format('[>=100]#,##0;[<=-100]-#,##0;#,##0.00', -3.96, '-3.96');
  t.format('[>=100]#,##0;[<=-100]-#,##0;-#,##0.00', -3.96, '--3.96');
  t.format('[>=100]0;[<=-100]-0;"xx"0', -10, '-xx10');
  t.format('[<=-100]-0;"xx"0', -10, 'xx10');
  t.end();
});

test('Excel ignores extra , in fractions:', t => { // issue #22
  t.format('#.##0,00', 0, '.000');
  t.format('#.##0,0,0', 0, '.000');
  t.end();
});

// FIXME: Some more work needs to be done with how digits are emitted (see https://github.com/borgar/numfmt/issues/18)
test.skip('Order of operators in exponential notation doesn\'t matter:', t => {
  // this pattern works in Excel but fails here because mantissa part is missing
  t.format('0?.?0E+1', 0, '00. 0E+1');
  t.format('0?.?0E+0', 0, '00. 0E+0');
  t.end();
});

// FIXME: Tthis is pretty deep in the weeds and Google sheets fairs no better...
test.skip('Digits following denominator are padding', t => {
  t.format('00 00/0z0', 12345.67, '12345 02/3z0');
  t.format('00 00/0 0', 12345.67, '12345 02/3 0');
  t.format('00 00/? ?', 12345.67, '12345 02/3  ');
  t.format('00 00/# #', 12345.67, '12345 02/3 0');
  t.end();
});

test('Integer gets injected if not present:', t => {
  t.format('.0', 1234, '1234.0');
  t.format(' .0', 1234, ' 1234.0');
  t.format('x.0', 1234, 'x1234.0');
  t.format(' . 0', 1234, ' 1234. 0');
  t.format('0 0/0', 1234, '1234 0/1');
  t.format('0/0', 1234, '1234/1');
  t.end();
});

test('Padding:', t => {
  t.format('0', 1, '1');
  t.format('0?', 1, '01');
  t.format('0??', 1, '0 1');
  t.format('0???', 1, '0  1');
  t.format('0????', 1, '0   1');
  t.format('0', 0, '0');
  t.format('0?', 0, '0 ');
  t.format('0??', 0, '0  ');
  t.format('0???', 0, '0   ');
  t.format('0????', 0, '0    ');
  t.format('0', 1, '1');
  t.format('0#', 1, '01');
  t.format('0##', 1, '01');
  t.format('0###', 1, '01');
  t.format('0####', 1, '01');
  t.format('0', 0, '0');
  t.format('0#', 0, '0');
  t.format('0##', 0, '0');
  t.format('0###', 0, '0');
  t.format('0####', 0, '0');

  t.format('0,', 1, '0');
  t.format('0,?', 1, '01');
  t.format('0,??', 1, '0 1');
  t.format('0,???', 1, '0,  1');
  t.format('0,????', 1, '0    1');
  t.format('0,', 0, '0');
  t.format('0,?', 0, '0 ');
  t.format('0,??', 0, '0  ');
  t.format('0,???', 0, '0,   ');
  t.format('0,????', 0, '0     ');

  t.format('.0', 1, '1.0');
  t.format('.?0', 1, '1. 0');
  t.format('.??0', 1, '1.  0');
  t.format('.???0', 1, '1.   0');
  t.format('.????0', 1, '1.    0');
  t.format('.0', 0, '.0');
  t.format('.?0', 0, '. 0');
  t.format('.??0', 0, '.  0');
  t.format('.???0', 0, '.   0');
  t.format('.????0', 0, '.    0');
  t.format('.0', 1, '1.0');
  t.format('.#0', 1, '1.0');
  t.format('.##0', 1, '1.0');
  t.format('.###0', 1, '1.0');
  t.format('.####0', 1, '1.0');
  t.format('.0', 0, '.0');
  t.format('.#0', 0, '.0');
  t.format('.##0', 0, '.0');
  t.format('.###0', 0, '.0');
  t.format('.####0', 0, '.0');
  t.end();
});
