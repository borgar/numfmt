import { readFileSync } from 'node:fs';
import { addLocale, getLocale, listLocales, parseBool, parseDate, parseNumber, parseTime, parseValue } from '../src/index.ts';
import { describe, expect, test } from 'vitest';

type TestCase = {
  test: string,
  v: string | number | boolean | null,
  z?: string,
};

describe('parseValue: EXCEL mode', () => {
  describe('parseValue functions correctly', () => {
    const tables = [
      { fn: './test/tables/parseValue-excel-en-us.json', locale: 'en-US' },
      { fn: './test/tables/parseValue-excel-en-gb.json', locale: 'en-GB' },
      { fn: './test/tables/parseValue-excel-is-is.json', locale: 'is-IS' },
      { fn: './test/tables/parseValue-excel-ja-jp.json', locale: 'ja-JP' }
    ];
    for (const table of tables) {
      describe(table.locale, () => {
        const TESTS: TestCase[] = JSON.parse(readFileSync(table.fn, 'utf8'));
        // when skipping tables we select ~2% of tests, else run them all...
        const p = process.env.SKIPTABLES ? 0.02 : 1;
        for (const testcase of TESTS) {
          if (Math.random() < p) {
            test(JSON.stringify(testcase.test), () => {
              const res = parseValue(testcase.test, { locale: table.locale }) ?? { value: null, formatId: undefined };
              expect({ value: res.value, formatId: res.formatId })
                .toEqual({ value: testcase.v ?? null, formatId: testcase.z });
            });
          }
        }
      });
    }
  });

  test('parseNumber locale support', () => {
    // can parse numbers in any language
    expect(parseNumber('1,234,567.89', { locale: 'en' })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1.234.567,89', { locale: 'en' })).toEqual(undefined);

    expect(parseNumber('1,234,567.89', { locale: 'de' })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de' })).toEqual({ value: 1234567.89, formatId: 4 });

    expect(parseNumber('1,234,567.89', { locale: 'de' })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de' })).toEqual({ value: 1234567.89, formatId: 4 });

    addLocale({ decimal: '·', group: '~', positive: 'ᐩ', negative: '÷', percent: '٪', exponent: 'X' }, 'xy');
    expect(parseNumber('1~234~567·89', { locale: 'xy' })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1\u202f234\u202f567,89', { locale: 'fr' })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1٬234٬567٫89', { locale: 'ar' })).toEqual({ value: 1234567.89, formatId: 4 });
  });

  test('parseDate locale support', () => {
    // can parse dates in any language
    expect(parseDate('13 march 1989', { locale: 'en' })).toEqual({ value: 32580, formatId: 15 });
    expect(parseDate('13 marec 1989', { locale: 'sl' })).toEqual({ value: 32580, formatId: 15 });
    expect(parseDate('13 mars 1989', { locale: 'is' })).toEqual({ value: 32580, formatId: 15 });
    expect(parseDate('23 Dec 1988', { locale: 'en' })).toEqual({ value: 32500, formatId: 15 });
    expect(parseDate('23 DES 1988', { locale: 'is' })).toEqual({ value: 32500, formatId: 15 });
    expect(parseDate('23 dec 1988', { locale: 'ro' })).toEqual({ value: 32500, formatId: 15 });
    expect(parseDate('27 febrero 31', { locale: 'es_UY' })).toEqual({ value: 11381, formatId: 15 });
    expect(parseDate('29 február 1916', { locale: 'hu' })).toEqual({ value: 5904, formatId: 15 });
    expect(parseDate('01 oct 1975', { locale: 'eb' })).toEqual({ value: 27668, formatId: 15 });

    // 7 May 1982 and 31 May 1982
    const may7 = { value: 30078, formatId: 14 };
    const may31 = { value: 30102, formatId: 14 };
    const orders = {
      0: { label: 'MDY', parts: [ '05', '07', '82' ], ok: { '05/31/82': may31 }, fail: [ '31/05/82' ] },
      1: { label: 'DMY', parts: [ '07', '05', '82' ], ok: { '31/05/82': may31 }, fail: [ '05/31/82' ] },
      2: { label: 'YMD', parts: [ '82', '05', '07' ], ok: {}, fail: [ '07/05/82', '31/05/82' ] }
    };

    const loc = listLocales().filter(l => l !== 'xx' && l !== 'xy');
    for (const l of loc) {
      const opt = { locale: l };
      const format = getLocale(l)?.format;
      const dateOrder = format?.dateOrder ?? 0;
      const order = orders[dateOrder];
      expect(order, `${l} has an unknown dateOrder: ${dateOrder}`).toBeDefined();
      const { label, parts } = order;

      // numeric fields are read in the locale's date order
      expect(parseDate(parts.join('/'), opt), `${l} is ${label} (${parts.join('/')})`).toEqual(may7);
      for (const [ input, expected ] of Object.entries(order.ok)) {
        expect(parseDate(input, opt), `${l} is ${label} (${input})`).toEqual(expected);
      }
      for (const input of order.fail) {
        expect(parseDate(input, opt), `${l} is ${label} (${input})`).toEqual(undefined);
      }

      // a leading four-digit year is year-month-day everywhere
      expect(parseDate('1982/05/07', opt), `${l}: 1982/05/07`).toEqual(may7);

      // "/" and "-" always separate, "." only where it is the locale's date separator
      expect(parseDate(parts.join('-'), opt), `${l}: ${parts.join('-')}`).toEqual(may7);
      expect(parseDate(parts.join('.'), opt), `${l}: ${parts.join('.')}`).toEqual(format?.dateSep === '.' ? may7 : undefined);
    }
  });

  test('parseDate numeric field order follows the locale', () => {
    const year = new Date().getUTCFullYear();
    const serial = (y: number, m: number, d: number) => (Date.UTC(y, m - 1, d) / 864e5) + 25569;
    const mdy = { locale: 'en' };
    const dmy = { locale: 'is' };

    // two numeric fields: the day/month pair swaps, the month/year pair does not
    expect(parseDate('5/15', mdy), 'en: 5/15').toEqual({ value: serial(year, 5, 15), formatId: 16 });
    expect(parseDate('5/15', dmy), 'is: 5/15').toEqual({ value: serial(2015, 5, 1), formatId: 17 });
    expect(parseDate('4/6', mdy), 'en: 4/6').toEqual({ value: serial(year, 4, 6), formatId: 16 });
    expect(parseDate('4/6', dmy), 'is: 4/6').toEqual({ value: serial(year, 6, 4), formatId: 16 });
    expect(parseDate('15/5', mdy), 'en: 15/5').toEqual(undefined);
    expect(parseDate('31/12', dmy), 'is: 31/12').toEqual({ value: serial(year, 12, 31), formatId: 16 });

    // three numeric fields, four-digit year
    expect(parseDate('6/4/1984', mdy), 'en: 6/4/1984').toEqual({ value: 30837, formatId: 14 });
    expect(parseDate('6/4/1984', dmy), 'is: 6/4/1984').toEqual({ value: serial(1984, 4, 6), formatId: 14 });
    expect(parseDate('5/15/2026', dmy), 'is: 5/15/2026').toEqual(undefined);

    // a leading four-digit year is always year-month-day, but the format follows the locale
    expect(parseDate('1984/6/4', mdy), 'en: 1984/6/4').toEqual({ value: 30837, formatId: 14 });
    expect(parseDate('1984/6/4', dmy), 'is: 1984/6/4').toEqual({ value: 30837, formatId: 14 });
    expect(parseDate('1984/13/4', dmy), 'is: 1984/13/4').toEqual(undefined);
  });

  test('parseTime locale support', () => {
    // AM and PM still work
    expect(parseTime('01:31 a', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 am', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 p', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 pm', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 A', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 AM', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 P', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 PM', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    // The rule is that AM/PM is either parsed as full match or only the first character
    expect(parseTime('01:31 f', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 f.', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 f.h', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 f.h.', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 F.H.', { locale: 'is' })).toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 fh', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 e.', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e.h', { locale: 'is' })).toEqual(undefined);
    expect(parseTime('01:31 e.h.', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 E.H.', { locale: 'is' })).toEqual({ value: 0.56319444444444444, formatId: 18 });
    expect(parseTime('01:31 eh', { locale: 'is' })).toEqual(undefined);
  });

  test('parseBool locale support', () => {
    expect(parseBool('TRUE', { locale: 'en' }), 'en: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'en' }), 'en: FALSE').toEqual({ value: false });
    expect(parseBool('TRUE', { locale: 'jn' }), 'jn: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'jn' }), 'jn: FALSE').toEqual({ value: false });
    expect(parseBool('TRUE', { locale: 'hu' }), 'hu: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'hu' }), 'hu: FALSE').toEqual({ value: false });
    expect(parseBool('IGAZ', { locale: 'hu' }), 'hu: IGAZ').toEqual({ value: true });
    expect(parseBool('HAMIS', { locale: 'hu' }), 'hu: HAMIS').toEqual({ value: false });
  });

  test('issue #71', () => {
    expect(parseValue('2021/1-10')).toEqual({ value: 44206, formatId: 14 });
  });

  test('issue #72', () => {
    expect(parseValue('01.01.01')).toBe(undefined);
  });

  test('all parsers default to en-US when no locale is given', () => {
    expect(parseDate('07/05/82'), 'parseDate: 07/05/82').toEqual({ value: 30137, formatId: 14 });
    expect(parseValue('07/05/82'), 'parseValue: 07/05/82').toEqual({ value: 30137, formatId: 14 });
    expect(parseDate('05/31/82'), 'parseDate: 05/31/82').toEqual({ value: 30102, formatId: 14 });
    expect(parseDate('31/05/82'), 'parseDate: 31/05/82').toBe(undefined);
    expect(parseDate('Apr 23, 2021'), 'parseDate: Apr 23, 2021').toEqual({ value: 44309, formatId: 15 });

    const enUS = { locale: 'en-US' };
    const inputs = [
      '07/05/82', '31/05/82', '5/15', 'Apr 23', 'Apr 23, 2021', '12/31/2024 14:30',
      '1,234.5', '1.234,5', '$5', '10%', '9:30 PM', '13:30', 'TRUE', 'FALSE'
    ];
    for (const input of inputs) {
      expect(parseValue(input), `parseValue: ${input}`).toEqual(parseValue(input, enUS));
      expect(parseNumber(input), `parseNumber: ${input}`).toEqual(parseNumber(input, enUS));
      expect(parseDate(input), `parseDate: ${input}`).toEqual(parseDate(input, enUS));
      expect(parseTime(input), `parseTime: ${input}`).toEqual(parseTime(input, enUS));
      expect(parseBool(input), `parseBool: ${input}`).toEqual(parseBool(input, enUS));
    }
  });
});
