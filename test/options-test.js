/* global process */
import test, { getTimeZoneName } from './utils.js';
import { format } from '../lib/index.js';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('option: overflow', t => {
  t.format('yyyy', -1, '######', { ...excelOpts });
  t.format('yyyy', -1, '🦆', { ...excelOpts, overflow: '🦆' });
  t.format('yyyy', -1, '👻', { ...excelOpts, overflow: '👻' });
  t.end();
});

test('option: locale', t => {
  t.format('mmmm', 2000, 'June');
  t.format('mmmm', 2000, '六月', { locale: 'zh_CN' });
  t.format('mmmm', 2000, 'kesäkuuta', { locale: 'fi' });
  t.end();
});

test('option: throws', t => {
  t.throws(() => format('h #', 0), '{}');
  t.equal(format('h #', 0, { throws: false }), '######', '{ throws: false }');
  t.throws(() => format('h #', 0, { throws: true }), '{ throws: true }');
  t.end();
});

test('option: invalid', t => {
  t.format('h #', 0, '######', { throws: false });
  t.format('h #', 0, '🦂', { invalid: '🦂', throws: false });
  t.format('h #', 0, '#VALUE!', { invalid: '#VALUE!', throws: false });
  t.format('h #', 0, 'true', { invalid: true, throws: false });
  t.end();
});

test('option: leap1900', t => {
  t.format('yyyy-mm-dd', 60, '1900-02-29', {});
  t.format('yyyy-mm-dd', 60, '1900-02-29', { leap1900: true });
  t.format('yyyy-mm-dd', 60, '1900-02-28', { leap1900: false });
  t.end();
});

test('option: dateErrorThrows', t => {
  t.format('yyyy', -694325, '-694325', {});
  t.format('yyyy', -1, '-1', { dateSpanLarge: false });
  t.formatThrows('yyyy', -1, '-1', { dateSpanLarge: false, dateErrorThrows: true });
  t.formatThrows('yyyy', -694325, '-694325', { dateErrorThrows: true });
  t.end();
});

test('option: dateErrorNumber', t => {
  t.format('yyyy', -1, '-1', { dateSpanLarge: false });
  t.format('yyyy', -1, '-1', { dateSpanLarge: false, dateErrorNumber: true });
  t.format('yyyy', -1, '######', { dateSpanLarge: false, dateErrorNumber: false });
  t.end();
});

test('option: nbsp', t => {
  const spaceFmt = '???0" ". 0??';
  t.format(spaceFmt, 1, '   1 . 0  ');
  t.format(spaceFmt, 1, '   1 . 0  ', { nbsp: true });
  t.format(spaceFmt, 1, '   1 . 0  ', { nbsp: false });
  t.format('0 "foo bar" .0', 1.1, '1 foo bar .1');
  t.format('0 "foo bar" .0', 1.1, '1 foo bar .1', { nbsp: false });
  t.format('0 "foo bar" .0', 1.1, '1 foo bar .1', { nbsp: true });
  t.end();
});

test('option: grouping', t => {
  t.format('0', 1234567890, '1234567890', { grouping: [ 2, 2 ] });
  t.format('#,##0', 1234567890, '1,234,567,890', { grouping: [ 3, 3 ] });
  t.format('#,##0', 1234567890, '1,234,567,890', { grouping: [ 3 ] });
  t.format('#,##0', 1234567890, '1,23,45,67,890', { grouping: [ 3, 2 ] });
  t.format('#,##0', 1234567890, '12,34,56,78,90', { grouping: [ 2, 2 ] });
  t.format('#,##0', 1234567890, '12,34,56,78,90', { grouping: [ 2 ] });
  t.format('#,##0', 1234567890, '12,345,678,90', { grouping: [ 2, 3 ] });
  t.end();
});

test('option: grouping', t => {
  t.format('_($* #,##0.00_)', 12345.67, ' $12,345.67 ');
  t.format('_($* #,##0.00_)', 12345.67, '\x03($12,345.67\x03)', { skipChar: '\x03' });
  t.format('_($* #,##0.00_)', 12345.67, 'ÆÐ($12,345.67ÆÐ)', { skipChar: 'ÆÐ' });
  t.format('_($* #,##0.00_)', 12345.67, ' $\x04 12,345.67 ', { fillChar: '\x04' });
  t.format('_($* #,##0.00_)', 12345.67, ' $ÞÖ 12,345.67 ', { fillChar: 'ÞÖ' });
  t.format('_($* #,##0.00_)', 12345.67, '\x03($\x04 12,345.67\x03)', { skipChar: '\x03', fillChar: '\x04' });
  t.end();
});

// this test is flaky at best in node versions < 14 so only run it in 14+
if (parseInt(process.version.replace(/^v/, ''), 10) >= 14) {
  test('option: ignoreTimezone', t => {
    process.env.TZ = 'Asia/Calcutta';
    t.equal(getTimeZoneName(), 'India Standard Time', 'Timezone is IST');
    const baseDate = new Date(2000, 0, 1);
    t.equal(baseDate.toUTCString(), 'Fri, 31 Dec 1999 18:30:00 GMT', 'Date has a timezone');
    const gmtStr = 'ddd, dd mmm yyyy hh:mm:ss "GMT"';
    t.format(gmtStr, baseDate, 'Sat, 01 Jan 2000 00:00:00 GMT', { nbsp: 0 });
    t.format(gmtStr, baseDate, 'Fri, 31 Dec 1999 18:30:00 GMT', { nbsp: 0, ignoreTimezone: true });
    t.format(gmtStr, baseDate, 'Sat, 01 Jan 2000 00:00:00 GMT', { nbsp: 0, ignoreTimezone: false });
    t.end();
  });
}
