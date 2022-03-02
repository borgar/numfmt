/* eslint-disable no-loss-of-precision */
import test from 'tape';
import fmt from '../lib';

test('near zero negatives:', t => {
  t.equal(fmt('-0')(-1), '--1');
  t.equal(fmt('-general')(-1), '--1');
  t.throws(() => fmt('0.0 general'), '0.0 general');
  t.equal(fmt('0.0')(-1), '-1.0');
  t.equal(fmt('0.0')(-0.1), '-0.1');
  t.equal(fmt('-0.0')(-0.01), '-0.0');
  t.equal(fmt('0.0')(-0.01), '0.0');
  t.equal(fmt(' - 0.0')(-0.01), ' - 0.0');
  t.equal(fmt(' - 0.0')(-1), '- - 1.0');
  t.equal(fmt('0.0;-0.0')(-0.01), '-0.0');
  t.equal(fmt('# ?/?')(-0.01), '-0    ');
  t.equal(fmt('\\p\\o\\s 0.0;\\n\\e\\g 0.0;')(-0.01), 'neg 0.0');
  t.end();
});

test('scaling should not mess number up:', t => {
  t.equal(fmt('0.0%')(0.0295), '3.0%');
  t.equal(fmt('0.0,')(2950), '3.0');
  t.equal(fmt('0%')(0), '0%');
  t.end();
});

test('Misc input:', t => {
  t.equal(fmt('0')(), '');
  t.equal(fmt('0')(null), '');
  t.equal(fmt('0')(NaN), 'NaN');
  t.equal(fmt('0')(Infinity), '∞');
  t.equal(fmt('0')(-Infinity), '-∞');
  t.equal(fmt('0')(true), 'TRUE');
  t.equal(fmt('0')(false), 'FALSE');
  t.end();
});

test('isDate:', t => {
  t.equal(fmt.isDate('y'), true, 'isDate(y)');
  t.equal(fmt.isDate('#;y'), true, 'isDate(#;y)');
  t.equal(fmt.isDate('"y"'), false, 'isDate("y")');
  t.equal(fmt.isDate('#;"y"'), false, 'isDate(#;"y")');
  t.equal(fmt.isDate('\\y'), false, 'isDate(\\y)');
  t.equal(fmt.isDate('#;\\y'), false, 'isDate(#;\\y)');
  t.equal(fmt.isDate('#'), false, 'isDate(#)');
  t.equal(fmt.isDate('@'), false, 'isDate(@)');
  t.equal(fmt.isDate(''), false, 'isDate()');
  t.end();
});

test('isPercent:', t => {
  t.equal(fmt.isPercent('0%'), true, 'isPercent(0%)');
  t.equal(fmt.isPercent('#%'), true, 'isPercent(#%)');
  t.equal(fmt.isPercent('#;#%'), true, 'isPercent(#;#%)');
  t.equal(fmt.isPercent('%'), true, 'isPercent(%)');
  t.equal(fmt.isPercent('#"%"'), false, 'isPercent(#"%")');
  t.equal(fmt.isPercent('#\\%'), false, 'isPercent(#\\%)');
  t.equal(fmt.isPercent('@'), false, 'isPercent(@)');
  t.equal(fmt.isPercent(''), false, 'isPercent()');
  t.end();
});

test('isText:', t => {
  t.equal(fmt.isText('0%'), false, 'isText(0%)');
  t.equal(fmt.isText('#%'), false, 'isText(#%)');
  t.equal(fmt.isText('#;#%'), false, 'isText(#;#%)');
  t.equal(fmt.isText('%'), false, 'isText(%)');
  t.equal(fmt.isText('#"%"'), false, 'isText(#"%")');
  t.equal(fmt.isText('#\\%'), false, 'isText(#\\%)');
  t.equal(fmt.isText(''), false, 'isText()');
  t.equal(fmt.isText('@'), true, 'isText(@)');
  t.equal(fmt.isText('[blue]@'), true, 'isText([blue]@)');
  t.equal(fmt.isText('#;@'), false, 'isText(#;@)');
  t.equal(fmt.isText('#;#;@'), false, 'isText(#;#;@)');
  t.equal(fmt.isText('#;#;#;@'), false, 'isText(#;#;#;@)');
  t.end();
});

test('Date object as a value:', t => {
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0)), '0.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 1)), '1.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 2)), '2.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 3)), '3.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 4)), '4.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 5)), '5.');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 20)), '20.');
  t.equal(fmt('0.######')(new Date(1900, 2 - 1, 1)), '32.');
  t.equal(fmt('0.######')(new Date(1900, 2 - 1, 28)), '59.', 'new Date(1900, 2 - 1, 28, 0, 0, 0)');
  // 1900-02-29 (serial number 60) is a date that only exists in Excel
  t.equal(fmt('0.######')(new Date(1900, 3 - 1, 1)), '61.', 'new Date(1900, 3 - 1, 1, 0, 0, 0)');
  t.equal(fmt('0.######')(new Date(1900, 3 - 1, 2)), '62.', 'new Date(1900, 3 - 1, 2, 0, 0, 0)');
  t.equal(fmt('0.######')(new Date(1900, 3 - 1, 3)), '63.', 'new Date(1900, 3 - 1, 3, 0, 0, 0)');
  t.equal(fmt('0.######')(new Date(2000, 10 - 1, 10)), '36809.');
  t.equal(fmt('0.######')(new Date(2100, 10 - 1, 30)), '73353.');
  t.equal(fmt('0.######')(new Date(2004, 2 - 1, 29)), '38046.');
  t.equal(fmt('0.######')(new Date(2020, 2 - 1, 29)), '43890.');
  t.equal(fmt('0.######')(new Date(2000, 5 - 1, 9, 1, 0, 0)), '36655.041667');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 1, 0, 0)), '0.041667');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 0, 1, 0)), '0.000694');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 0, 0, 1)), '0.000012');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 23, 0, 0)), '0.958333');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 0, 59, 0)), '0.040972');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 0, 0, 59)), '0.000683');
  t.equal(fmt('0.######')(new Date(1900, 1 - 1, 0, 23, 59, 59)), '0.999988');
  t.equal(fmt('0.######')(new Date(1909, 1 - 1, 2, 3, 4, 5)), '3290.127836');
  t.equal(fmt('0.######')(new Date(1909, 1 - 1, 2, 3, 4, 5)), '3290.127836');
  // these were yielding "Sep 0, 2020"
  t.equal(fmt('MMM D, YYYY')(new Date(2020, 8 - 1, 31, 13, 3, 0)), 'Aug 31, 2020');
  t.equal(fmt('MMM D, YYYY')(new Date(Date.parse('2020-08-31T02:42:00.1'))), 'Aug 31, 2020');

  // test ignoreTimezone
  const testYMD = (y, m, d) => {
    const dt = new Date(y, m, d);
    const tzSkew = dt.getTimezoneOffset() / (60 * 24);
    const output = fmt('General')(dt, { ignoreTimezone: true });
    const diff = (output.replace(/^\d*(\.\d*)?$/, '0$1')) - tzSkew;
    return Math.abs(diff);
  };
  t.ok(testYMD(1900, 1 - 1, 0) < 0.00001, '1900 [ignoreTimezone]');
  t.ok(testYMD(1950, 1 - 1, 0) < 0.00001, '1950 [ignoreTimezone]');
  t.ok(testYMD(2000, 1 - 1, 0) < 0.00001, '2000 [ignoreTimezone]');

  t.end();
});

test('Significant digits truncation:', t => {
  t.equal(fmt('General')(3300.0000000000005), '3300');
  t.equal(fmt('General')(-33000.000000000001), '-33000');
  t.end();
});
