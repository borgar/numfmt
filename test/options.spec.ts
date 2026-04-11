/* global process */
import { test, expect } from 'vitest';
import { getTimeZoneName } from './utils.ts';
import { assertFormat, assertFormatThrows } from './utils.ts';
import { format } from '../lib/index.ts';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('option: overflow', () => {
  expect.assertions(3);
  assertFormat('yyyy', -1, '######', { ...excelOpts });
  assertFormat('yyyy', -1, '🦆', { ...excelOpts, overflow: '🦆' });
  assertFormat('yyyy', -1, '👻', { ...excelOpts, overflow: '👻' });
});

test('option: locale', () => {
  expect.assertions(3);
  assertFormat('mmmm', 2000, 'June');
  assertFormat('mmmm', 2000, '六月', { locale: 'zh_CN' });
  assertFormat('mmmm', 2000, 'kesäkuuta', { locale: 'fi' });
});

test('option: throws', () => {
  expect.assertions(3);
  expect(() => format('h #', 0)).toThrow();
  expect(format('h #', 0, { throws: false })).toBe('######');
  expect(() => format('h #', 0, { throws: true })).toThrow();
});

test('option: invalid', () => {
  expect.assertions(4);
  assertFormat('h #', 0, '######', { throws: false });
  assertFormat('h #', 0, '🦂', { invalid: '🦂', throws: false });
  assertFormat('h #', 0, '#VALUE!', { invalid: '#VALUE!', throws: false });
  assertFormat('h #', 0, 'true', { invalid: true, throws: false });
});

test('option: leap1900', () => {
  expect.assertions(3);
  assertFormat('yyyy-mm-dd', 60, '1900-02-29', {});
  assertFormat('yyyy-mm-dd', 60, '1900-02-29', { leap1900: true });
  assertFormat('yyyy-mm-dd', 60, '1900-02-28', { leap1900: false });
});

test('option: dateErrorThrows', () => {
  expect.assertions(4);
  assertFormat('yyyy', -694325, '-694325', {});
  assertFormat('yyyy', -1, '-1', { dateSpanLarge: false });
  assertFormatThrows('yyyy', -1, '-1', { dateSpanLarge: false, dateErrorThrows: true });
  assertFormatThrows('yyyy', -694325, '-694325', { dateErrorThrows: true });
});

test('option: dateErrorNumber', () => {
  expect.assertions(3);
  assertFormat('yyyy', -1, '-1', { dateSpanLarge: false });
  assertFormat('yyyy', -1, '-1', { dateSpanLarge: false, dateErrorNumber: true });
  assertFormat('yyyy', -1, '######', { dateSpanLarge: false, dateErrorNumber: false });
});

test('option: nbsp', () => {
  expect.assertions(6);
  const spaceFmt = '???0" ". 0??';
  assertFormat(spaceFmt, 1, '   1 . 0  ');
  assertFormat(spaceFmt, 1, '\u00a0\u00a0\u00a01\u00a0.\u00a00\u00a0\u00a0', { nbsp: true });
  assertFormat(spaceFmt, 1, '   1 . 0  ', { nbsp: false });
  assertFormat('0 "foo bar" .0', 1.1, '1 foo bar .1');
  assertFormat('0 "foo bar" .0', 1.1, '1 foo bar .1', { nbsp: false });
  assertFormat('0 "foo bar" .0', 1.1, '1\u00a0foo\u00a0bar\u00a0.1', { nbsp: true });
});

test('option: grouping', () => {
  expect.assertions(7);
  assertFormat('0', 1234567890, '1234567890', { grouping: [ 2, 2 ] });
  assertFormat('#,##0', 1234567890, '1,234,567,890', { grouping: [ 3, 3 ] });
  assertFormat('#,##0', 1234567890, '1,234,567,890', { grouping: [ 3 ] });
  assertFormat('#,##0', 1234567890, '1,23,45,67,890', { grouping: [ 3, 2 ] });
  assertFormat('#,##0', 1234567890, '12,34,56,78,90', { grouping: [ 2, 2 ] });
  assertFormat('#,##0', 1234567890, '12,34,56,78,90', { grouping: [ 2 ] });
  assertFormat('#,##0', 1234567890, '12,345,678,90', { grouping: [ 2, 3 ] });
});

test('option: grouping', () => {
  expect.assertions(6);
  assertFormat('_($* #,##0.00_)', 12345.67, ' $12,345.67 ');
  assertFormat('_($* #,##0.00_)', 12345.67, '\x03($12,345.67\x03)', { skipChar: '\x03' });
  assertFormat('_($* #,##0.00_)', 12345.67, 'ÆÐ($12,345.67ÆÐ)', { skipChar: 'ÆÐ' });
  assertFormat('_($* #,##0.00_)', 12345.67, ' $\x04 12,345.67 ', { fillChar: '\x04' });
  assertFormat('_($* #,##0.00_)', 12345.67, ' $ÞÖ 12,345.67 ', { fillChar: 'ÞÖ' });
  assertFormat('_($* #,##0.00_)', 12345.67, '\x03($\x04 12,345.67\x03)', { skipChar: '\x03', fillChar: '\x04' });
});

// this test is flaky at best in node versions < 14 so only run it in 14+
if (parseInt(process.version.replace(/^v/, ''), 10) >= 14) {
  test('option: ignoreTimezone', () => {
    expect.assertions(5);
    process.env.TZ = 'Asia/Calcutta';
    expect(getTimeZoneName()).toBe('India Standard Time');
    const baseDate = new Date(2000, 0, 1);
    expect(baseDate.toUTCString()).toBe('Fri, 31 Dec 1999 18:30:00 GMT');
    const gmtStr = 'ddd, dd mmm yyyy hh:mm:ss "GMT"';
    assertFormat(gmtStr, baseDate, 'Sat, 01 Jan 2000 00:00:00 GMT', { nbsp: 0 });
    assertFormat(gmtStr, baseDate, 'Fri, 31 Dec 1999 18:30:00 GMT', { nbsp: 0, ignoreTimezone: true });
    assertFormat(gmtStr, baseDate, 'Sat, 01 Jan 2000 00:00:00 GMT', { nbsp: 0, ignoreTimezone: false });
  });
}
