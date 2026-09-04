import { readFileSync } from 'node:fs';
import { addLocale, getLocale, listLocales, parseBool, parseDate, parseNumber, parseTime, parseValue } from '../lib/index.ts';
import { describe, expect, test } from 'vitest';

type TestCase = {
  test: string,
  v: string | number | boolean | null,
  z?: string,
};

const TESTS: TestCase[] = JSON.parse(readFileSync('./test/tables/parseValue-excel.json', 'utf8'));

describe('parseValue: EXCEL mode', () => {
  describe('parseValue functions correctly', () => {
    for (const testcase of TESTS) {
      test(JSON.stringify(testcase.test), () => {
        const res = parseValue(testcase.test, { locale: 'en-us' }) ?? { v: null, z: undefined };
        expect(res).toEqual({
          v: testcase.v ?? null,
          z: testcase.z
        });
      });
    }
  });

  test('parseNumber locale support', () => {
    // can parse numbers in any language
    expect(parseNumber('1,234,567.89', { locale: 'en' })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1.234.567,89', { locale: 'en' })).toEqual(undefined);

    expect(parseNumber('1,234,567.89', { locale: 'de' })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de' })).toEqual({ v: 1234567.89, z: '#,##0.00' });

    expect(parseNumber('1,234,567.89', { locale: 'de' })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de' })).toEqual({ v: 1234567.89, z: '#,##0.00' });

    addLocale({ decimal: '·', group: '~', positive: 'ᐩ', negative: '÷', percent: '٪', exponent: 'X' }, 'xy');
    expect(parseNumber('1~234~567·89', { locale: 'xy' })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1\u202f234\u202f567,89', { locale: 'fr' })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1٬234٬567٫89', { locale: 'ar' })).toEqual({ v: 1234567.89, z: '#,##0.00' });
  });

  test('parseDate locale support', () => {
    // can parse dates in any language
    expect(parseDate('13 march 1989', { locale: 'en' })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('13 marec 1989', { locale: 'sl' })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('13 mars 1989', { locale: 'is' })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('23 Dec 1988', { locale: 'en' })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('23 DES 1988', { locale: 'is' })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('23 dec 1988', { locale: 'ro' })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('27 febrero 31', { locale: 'es_UY' })).toEqual({ v: 11381, z: 'd-mmm-yy' });
    expect(parseDate('29 február 1916', { locale: 'hu' })).toEqual({ v: 5904, z: 'd-mmm-yy' });
    expect(parseDate('01 oct 1975', { locale: 'eb' })).toEqual({ v: 27668, z: 'd-mmm-yy' });

    const loc = listLocales().filter(l => l !== 'xx' && l !== 'xy');
    for (const l of loc) {
      const opt = { locale: l };
      // locales with preferMDY should allow dates that fit, else only allow DMY
      const MDY = getLocale(l)?.preferMDY;
      if (MDY) {
        expect(parseDate('07/05/82', opt), `${l} prefers MDY (07/05/82)`).toEqual({ v: 30137, z: 'm/d/yy' });
        expect(parseDate('31/05/82', opt), `${l} prefers MDY (31/05/82)`).toEqual(undefined);
        expect(parseDate('05/31/82', opt), `${l} prefers MDY (05/31/82)`).toEqual({ v: 30102, z: 'm/d/yy' });
      }
      else {
        expect(parseDate('07/05/82', opt), `${l} prefers DMY (07/05/82)`).toEqual({ v: 30078, z: 'd/m/yy' });
        expect(parseDate('07/31/82', opt), `${l} prefers DMY (07/31/82)`).toEqual(undefined);
        expect(parseDate('31/05/82', opt), `${l} prefers MDY (31/05/82)`).toEqual({ v: 30102, z: 'd/m/yy' });
      }
    }
  });

  test('parseDate numeric field order follows the locale', () => {
    const year = new Date().getUTCFullYear();
    const serial = (y: number, m: number, d: number) => (Date.UTC(y, m - 1, d) / 864e5) + 25569;
    const mdy = { locale: 'en' };
    const dmy = { locale: 'is' };

    // two numeric fields: the day/month pair swaps, the month/year pair does not
    expect(parseDate('5/15', mdy), 'en: 5/15').toEqual({ v: serial(year, 5, 15), z: 'd-mmm' });
    expect(parseDate('5/15', dmy), 'is: 5/15').toEqual({ v: serial(2015, 5, 1), z: 'mmm-yy' });
    expect(parseDate('4/6', mdy), 'en: 4/6').toEqual({ v: serial(year, 4, 6), z: 'd-mmm' });
    expect(parseDate('4/6', dmy), 'is: 4/6').toEqual({ v: serial(year, 6, 4), z: 'd-mmm' });
    expect(parseDate('15/5', mdy), 'en: 15/5').toEqual(undefined);
    expect(parseDate('31/12', dmy), 'is: 31/12').toEqual({ v: serial(year, 12, 31), z: 'd-mmm' });

    // three numeric fields, four-digit year
    expect(parseDate('6/4/1984', mdy), 'en: 6/4/1984').toEqual({ v: 30837, z: 'm/d/yy' });
    expect(parseDate('6/4/1984', dmy), 'is: 6/4/1984').toEqual({ v: serial(1984, 4, 6), z: 'd/m/yy' });
    expect(parseDate('5/15/2026', dmy), 'is: 5/15/2026').toEqual(undefined);

    // a leading four-digit year is always year-month-day, but the format follows the locale
    expect(parseDate('1984/6/4', mdy), 'en: 1984/6/4').toEqual({ v: 30837, z: 'm/d/yy' });
    expect(parseDate('1984/6/4', dmy), 'is: 1984/6/4').toEqual({ v: 30837, z: 'd/m/yy' });
    expect(parseDate('1984/13/4', dmy), 'is: 1984/13/4').toEqual(undefined);
  });

  test('parseTime locale support', () => {
    // AM and PM still work
    expect(parseTime('01:31 a', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 am', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 p', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 pm', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 A', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 AM', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 P', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 PM', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    // The rule is that AM/PM is either parsed as full match or only the first character
    expect(parseTime('01:31 f', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 f.', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 f.h', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 f.h.', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 F.H.', { locale: 'is' })).toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 fh', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 e.', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e.h', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e.h.', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 E.H.', { locale: 'is' })).toEqual({ v: 0.56319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 eh', { locale: 'is' })).toEqual(undefined);
  });

  test('parseBool locale support', () => {
    expect(parseBool('TRUE', { locale: 'en' }), 'en: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'en' }), 'en: FALSE').toEqual({ v: false });
    expect(parseBool('TRUE', { locale: 'jn' }), 'jn: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'jn' }), 'jn: FALSE').toEqual({ v: false });
    expect(parseBool('TRUE', { locale: 'hu' }), 'hu: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'hu' }), 'hu: FALSE').toEqual({ v: false });
    expect(parseBool('IGAZ', { locale: 'hu' }), 'hu: IGAZ').toEqual({ v: true });
    expect(parseBool('HAMIS', { locale: 'hu' }), 'hu: HAMIS').toEqual({ v: false });
  });
});
