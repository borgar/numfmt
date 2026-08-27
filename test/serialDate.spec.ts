/* globals process */

import { expect, test } from 'vitest';
import { getTimeZoneName } from './utils.ts';
import { dateToSerial, dateFromSerial } from '../lib/index.ts';

function round (n: number): number {
  return Math.round(n * 1e10) / 1e10;
}

test('dateToSerial (Date)', () => {
  process.env.TZ = 'Asia/Calcutta';
  expect(getTimeZoneName(), 'Timezone is IST').toBe('India Standard Time');

  const testYMD = (y: number, m: number, d: number, hh: number, mm: number, ss: number, tz = false) => {
    const dt = new Date(y, m - 1, d, hh, mm, ss);
    return round(dateToSerial(dt, { ignoreTimezone: tz }) ?? 0);
  };

  expect(testYMD(1978, 5, 17, 10, 25, 30, true), '[1978, 5, 17, 10, 25, 30] ignoreTimezone').toBe(28627.2052083333);
  expect(testYMD(1978, 5, 17, 10, 25, 30), '[1978, 5, 17, 10, 25, 30]').toBe(28627.434375);

  expect(testYMD(2022, 3, 1, 13, 53, 11), '[2022, 3, 1, 13, 53, 11]').toBe(44621.578599537);
  expect(testYMD(2022, 3, 1, 13, 53, 11, true), '[2022, 3, 1, 13, 53, 11] ignoreTimezone').toBe(44621.3494328704);

  expect(testYMD(1900, 1, 1, 0, 0, 0), '[1900, 1, 1, 0, 0, 0]').toBe(1);
  expect(testYMD(1900, 1, 1, 0, 0, 0, true), '[1900, 1, 1, 0, 0, 0] ignoreTimezone').toBe(0.7769675926);

  expect(testYMD(1950, 1, 1, 0, 0, 0), '[1950, 1, 1, 0, 0, 0]').toBe(18264);
  expect(testYMD(1950, 1, 1, 0, 0, 0, true), '[1950, 1, 1, 0, 0, 0] ignoreTimezone').toBe(18263.7708333333);

  expect(testYMD(2000, 1, 1, 0, 0, 0), '[2000, 1, 1, 0, 0, 0]').toBe(36526);
  expect(testYMD(2000, 1, 1, 0, 0, 0, true), '[2000, 1, 1, 0, 0, 0] ignoreTimezone').toBe(36525.7708333333);
});

test('dateToSerial (Array)', () => {
  const testYMD = (y: number, m: number, d: number, hh: number, mm: number, ss: number, tz = false) => {
    return round(dateToSerial(
      [ y, m, d, hh, mm, ss ],
      { ignoreTimezone: tz }
    ) ?? 0);
  };
  expect(testYMD(1978, 5, 17, 10, 25, 30, false), '[1978, 5, 17, 10, 25, 30]').toBe(28627.434375);
  expect(testYMD(1978, 5, 17, 10, 25, 30, true), '[1978, 5, 17, 10, 25, 30]').toBe(28627.434375);
  expect(testYMD(2022, 3, 1, 13, 53, 11, false), '[2022, 3, 1, 13, 53, 11]').toBe(44621.578599537);
  expect(testYMD(2022, 3, 1, 13, 53, 11, true), '[2022, 3, 1, 13, 53, 11]').toBe(44621.578599537);
  expect(testYMD(1900, 1, 1, 0, 0, 0, false), '[1900, 1, 1, 0, 0, 0]').toBe(1);
  expect(testYMD(1900, 1, 1, 0, 0, 0, true), '[1900, 1, 1, 0, 0, 0]').toBe(1);
  expect(testYMD(1950, 1, 1, 0, 0, 0, false), '[1950, 1, 1, 0, 0, 0]').toBe(18264);
  expect(testYMD(1950, 1, 1, 0, 0, 0, true), '[1950, 1, 1, 0, 0, 0]').toBe(18264);
  expect(testYMD(2000, 1, 1, 0, 0, 0, false), '[2000, 1, 1, 0, 0, 0]').toBe(36526);
  expect(testYMD(2000, 1, 1, 0, 0, 0, true), '[2000, 1, 1, 0, 0, 0]').toBe(36526);
});

test('dateFromSerial', () => {
  process.env.TZ = 'Europe/Amsterdam';
  expect(
    /^Central European (Standard|Summer) Time$/.test(getTimeZoneName()),
    'Timezone is what we think it is'
  ).toBeTruthy();

  expect(
    dateFromSerial(1234),
    'dateFromSerial(1234)'
  ).toEqual([ 1903, 5, 18, 0, 0, 0 ]);
  expect(
    dateFromSerial(1234.567),
    'dateFromSerial(1234)'
  ).toEqual([ 1903, 5, 18, 13, 36, 28 ]);
  expect(
    dateFromSerial(12),
    'dateFromSerial(12)'
  ).toEqual([ 1900, 1, 12, 0, 0, 0 ]);
  expect(
    dateFromSerial(24052.8361),
    'dateFromSerial(24052.8361)'
  ).toEqual([ 1965, 11, 6, 20, 3, 59 ]);
  expect(
    dateFromSerial(42341),
    'dateFromSerial(42341)'
  ).toEqual([ 2015, 12, 3, 0, 0, 0 ]);
});
