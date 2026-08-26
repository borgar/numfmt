/* global process */
import { expect, test } from 'vitest';
import { getTimeZoneName } from './utils.ts';
import { format } from '../lib/index.ts';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('option: overflow', () => {
  expect(format('yyyy', -1, { ...excelOpts })).toBe('######');
  expect(format('yyyy', -1, { ...excelOpts, overflow: '🦆' })).toBe('🦆');
  expect(format('yyyy', -1, { ...excelOpts, overflow: '👻' })).toBe('👻');
});

test('option: locale', () => {
  expect(format('mmmm', 2000)).toBe('June');
  expect(format('mmmm', 2000, { locale: 'zh_CN' })).toBe('六月');
  expect(format('mmmm', 2000, { locale: 'fi' })).toBe('kesäkuuta');
});

test('option: throws', () => {
  expect(() => format('h #', 0), '{}').toThrow();
  expect(format('h #', 0, { throws: false }), '{ throws: false }').toBe('######');
  expect(() => format('h #', 0, { throws: true }), '{ throws: true }').toThrow();
});

test('option: invalid', () => {
  expect(format('h #', 0, { throws: false })).toBe('######');
  expect(format('h #', 0, { invalid: '🦂', throws: false })).toBe('🦂');
  expect(format('h #', 0, { invalid: '#VALUE!', throws: false })).toBe('#VALUE!');
  expect(format('h #', 0, { invalid: true, throws: false })).toBe('true');
});

test('option: leap1900', () => {
  expect(format('yyyy-mm-dd', 60, {})).toBe('1900-02-29');
  expect(format('yyyy-mm-dd', 60, { leap1900: true })).toBe('1900-02-29');
  expect(format('yyyy-mm-dd', 60, { leap1900: false })).toBe('1900-02-28');
});

test('option: dateErrorThrows', () => {
  expect(format('yyyy', -694325, {})).toBe('-694325');
  expect(format('yyyy', -1, { dateSpanLarge: false })).toBe('-1');
  expect(() => format('yyyy', -1, { dateSpanLarge: false, dateErrorThrows: true })).toThrow();
  expect(() => format('yyyy', -694325, { dateErrorThrows: true })).toThrow();
});

test('option: dateErrorNumber', () => {
  expect(format('yyyy', -1, { dateSpanLarge: false })).toBe('-1');
  expect(format('yyyy', -1, { dateSpanLarge: false, dateErrorNumber: true })).toBe('-1');
  expect(format('yyyy', -1, { dateSpanLarge: false, dateErrorNumber: false })).toBe('######');
});

test('option: nbsp', () => {
  const spaceFmt = '???0" ". 0??';
  expect(format(spaceFmt, 1)).toBe('   1 . 0  ');
  expect(format(spaceFmt, 1, { nbsp: true })).toBe('   1 . 0  ');
  expect(format(spaceFmt, 1, { nbsp: false })).toBe('   1 . 0  ');
  expect(format('0 "foo bar" .0', 1.1)).toBe('1 foo bar .1');
  expect(format('0 "foo bar" .0', 1.1, { nbsp: false })).toBe('1 foo bar .1');
  expect(format('0 "foo bar" .0', 1.1, { nbsp: true })).toBe('1 foo bar .1');
});

test('option: grouping', () => {
  expect(format('0', 1234567890, { grouping: [ 2, 2 ] })).toBe('1234567890');
  expect(format('#,##0', 1234567890, { grouping: [ 3, 3 ] })).toBe('1,234,567,890');
  expect(format('#,##0', 1234567890, { grouping: [ 3 ] })).toBe('1,234,567,890');
  expect(format('#,##0', 1234567890, { grouping: [ 3, 2 ] })).toBe('1,23,45,67,890');
  expect(format('#,##0', 1234567890, { grouping: [ 2, 2 ] })).toBe('12,34,56,78,90');
  expect(format('#,##0', 1234567890, { grouping: [ 2 ] })).toBe('12,34,56,78,90');
  expect(format('#,##0', 1234567890, { grouping: [ 2, 3 ] })).toBe('12,345,678,90');
});

test('option: grouping', () => {
  expect(format('_($* #,##0.00_)', 12345.67)).toBe(' $12,345.67 ');
  expect(format('_($* #,##0.00_)', 12345.67, { skipChar: '\x03' })).toBe('\x03($12,345.67\x03)');
  expect(format('_($* #,##0.00_)', 12345.67, { skipChar: 'ÆÐ' })).toBe('ÆÐ($12,345.67ÆÐ)');
  expect(format('_($* #,##0.00_)', 12345.67, { fillChar: '\x04' })).toBe(' $\x04 12,345.67 ');
  expect(format('_($* #,##0.00_)', 12345.67, { fillChar: 'ÞÖ' })).toBe(' $ÞÖ 12,345.67 ');
  expect(format('_($* #,##0.00_)', 12345.67, { skipChar: '\x03', fillChar: '\x04' }))
    .toBe('\x03($\x04 12,345.67\x03)');
});

// this test is flaky at best in node versions < 14 so only run it in 14+
if (parseInt(process.version.replace(/^v/, ''), 10) >= 14) {
  test('option: ignoreTimezone', () => {
    process.env.TZ = 'Asia/Calcutta';
    expect(getTimeZoneName(), 'Timezone is IST').toBe('India Standard Time');
    const baseDate = new Date(2000, 0, 1);
    expect(baseDate.toUTCString(), 'Date has a timezone').toBe('Fri, 31 Dec 1999 18:30:00 GMT');
    const gmtStr = 'ddd, dd mmm yyyy hh:mm:ss "GMT"';
    expect(format(gmtStr, baseDate, { nbsp: 0 })).toBe('Sat, 01 Jan 2000 00:00:00 GMT');
    expect(format(gmtStr, baseDate, { nbsp: 0, ignoreTimezone: true })).toBe('Fri, 31 Dec 1999 18:30:00 GMT');
    expect(format(gmtStr, baseDate, { nbsp: 0, ignoreTimezone: false })).toBe('Sat, 01 Jan 2000 00:00:00 GMT');
  });
}
