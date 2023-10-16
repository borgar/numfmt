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
  t.format(spaceFmt, 1, '   1 . 0  ');
  t.format(spaceFmt, 1, '   1 . 0  ', { nbsp: true });
  t.format(spaceFmt, 1, '   1 . 0  ', { nbsp: false });
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
