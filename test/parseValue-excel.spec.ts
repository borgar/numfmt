import { readFileSync } from 'node:fs';
import { addLocale, format, getLocale, listLocales, parseBool, parseDate, parseNumber, parseTime, parseValue } from '../lib/index.ts';
import { describe, expect, test } from 'vitest';

type TestCase = {
  test: string,
  v: string | number | boolean,
  z?: string,
  f?: string,
};

const TESTS: TestCase[] = JSON.parse(readFileSync('./test/parseValue-excel.json', 'utf8'));

const expr = [
  '=1+1',
  '=1/2.',
  '=1/2',
  '=1',
  '=00123',
  '=00123.',
  '=1e5',
  '=50%',
  '=2024-02-29',
  '=2024-02-29.'
];

describe('parseValue: EXCEL mode', () => {
  // describe('parseValue functions correctly', () => {
  //   for (const testcase of TESTS) {
  //     test(JSON.stringify(testcase.test), () => {
  //       const exp: Record<string, any> = {
  //         v: testcase.v ?? null,
  //         z: testcase.z
  //       };
  //       if (expr.includes(testcase.test)) {
  //         exp.v = null;
  //       }
  //       if (("'" + testcase.v) === testcase.test) {
  //         exp.v = null;
  //       }
  //       if (testcase.test.startsWith('=') && (testcase.v === '' || testcase.v === 0)) {
  //         exp.v = null;
  //       }
  //       const res = parseValue(testcase.test, { locale: 'en-us', mode: 0 }) ?? { v: null, z: undefined };
  //       expect(res).toEqual(exp);
  //     });
  //   }
  // });

  test('parseNumber locale support', () => {
    // can parse numbers in any language
    expect(parseNumber('1,234,567.89', { locale: 'en', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1.234.567,89', { locale: 'en', mode: 0 })).toEqual(undefined);

    expect(parseNumber('1,234,567.89', { locale: 'de', mode: 0 })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });

    expect(parseNumber('1,234,567.89', { locale: 'de', mode: 0 })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });

    addLocale({
      decimal: '·',
      group: '~',
      positive: 'ᐩ',
      negative: '÷',
      percent: '٪',
      exponent: 'X'
    }, 'xy');
    // expect(format('#,##0.00', 1234567.89, { locale: 'xy', mode: 0 })).toBe('1~234~567·89');
    expect(parseNumber('1~234~567·89', { locale: 'xy', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1\u202f234\u202f567,89', { locale: 'fr', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });
    expect(parseNumber('1٬234٬567٫89', { locale: 'ar', mode: 0 })).toEqual({ v: 1234567.89, z: '#,##0.00' });
  });

  test.only('parseDate locale support', () => {
    // can parse dates in any language
    expect(parseDate('13 march 1989', { locale: 'en', mode: 0 })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('13 marec 1989', { locale: 'sl', mode: 0 })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('13 mars 1989', { locale: 'is', mode: 0 })).toEqual({ v: 32580, z: 'd-mmm-yy' });
    expect(parseDate('23 Dec 1988', { locale: 'en', mode: 0 })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('23 DES 1988', { locale: 'is', mode: 0 })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('23 dec 1988', { locale: 'ro', mode: 0 })).toEqual({ v: 32500, z: 'd-mmm-yy' });
    expect(parseDate('27 febrero 31', { locale: 'es_UY', mode: 0 })).toEqual({ v: 11381, z: 'd-mmm-yy' });
    expect(parseDate('29 február 1916', { locale: 'hu', mode: 0 })).toEqual({ v: 5904, z: 'd-mmm-yy' });
    expect(parseDate('01 oct 1975', { locale: 'eb', mode: 0 })).toEqual({ v: 27668, z: 'd-mmm-yy' });

    const fm = [
      'dddd d mmmm yyyy',
      'ddd d mmmm yyyy',
      'd mmmm yyyy ddd',
      'dddd, d mmmm yyyy',
      'd mmmm yyyy, dddd hh:mm',
      'd - mmm - yyyy',
      'd.mmm.yyyy',
      'm.d.yyyy',
      'm. yyyy',
      'yyyy/mmmm',
      'mmmm/yy',
      'yy/mmmm/d'
    ];
    const loc = listLocales().filter(l => l !== 'xx' && l !== 'xy');
    for (const l of loc) {
      const opt = { locale: l, mode: 0 };
      // for (const f of fm) {
      //   const o = format(f, 3290.1278435, opt);
      //   const parsed = parseDate(o, opt);
      //   expect(!!parsed, `Locale: "${f}" in ${l} (${o})`).toBeTruthy();
      // }
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

  test('parseTime locale support', () => {
    expect(parseTime('01:31 a', { locale: 'fi', mode: 0 }), 'fi: 01:31 a').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 am', { locale: 'fi', mode: 0 }), 'fi: 01:31 am').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 ap.', { locale: 'fi', mode: 0 }), 'fi: 01:31 ap.').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 ap', { locale: 'fi', mode: 0 }), 'fi: 01:31 ap').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });

    expect(parseTime('01:31 a', { locale: 'is', mode: 0 }), 'is: 01:31 a').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    expect(parseTime('01:31 am', { locale: 'is', mode: 0 }), 'is: 01:31 am').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 fh', { locale: 'is', mode: 0 }), 'is: 01:31 fh').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 fh.', { locale: 'is', mode: 0 }), 'is: 01:31 fh.').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 f.h.', { locale: 'is', mode: 0 }), 'is: 01:31 f.h.').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
    // expect(parseTime('01:31 f. h.', { locale: 'is', mode: 0 }), 'is: 01:31 f. h.').toEqual({ v: 0.06319444444444444, z: 'h:mm AM/PM' });
  });

  test('parseBool locale support', () => {
    expect(parseBool('TRUE', { locale: 'en', mode: 0 }), 'en: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'en', mode: 0 }), 'en: FALSE').toEqual({ v: false });
    expect(parseBool('TRUE', { locale: 'jn', mode: 0 }), 'jn: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'jn', mode: 0 }), 'jn: FALSE').toEqual({ v: false });
    expect(parseBool('TRUE', { locale: 'hu', mode: 0 }), 'hu: TRUE').toEqual({ v: true });
    expect(parseBool('FALSE', { locale: 'hu', mode: 0 }), 'hu: FALSE').toEqual({ v: false });
    expect(parseBool('IGAZ', { locale: 'hu', mode: 0 }), 'hu: IGAZ').toEqual({ v: true });
    expect(parseBool('HAMIS', { locale: 'hu', mode: 0 }), 'hu: HAMIS').toEqual({ v: false });
  });
});
