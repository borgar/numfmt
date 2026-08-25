import { expect, test } from 'vitest';
import { format } from '../lib/index.js';

const ISODATE = 'yyyy-mm-dd';
const ISODATETIME = 'yyyy-mm-dd\\Thh:mm:ss';

test('dateSpanLarge: OFF', () => {
  const opts = { leap1900: false, dateSpanLarge: false, dateErrorThrows: true };

  expect(() => format(ISODATE, -0.1, opts), '-0.1').toThrow();
  expect(() => format(ISODATE, -0.01, opts), '-0.01').toThrow();
  expect(() => format(ISODATE, -0.001, opts), '-0.001').toThrow();
  expect(() => format(ISODATE, -0.0001, opts), '-0.0001').toThrow();
  expect(() => format(ISODATE, -0.00001, opts), '-0.00001').toThrow();
  expect(() => format(ISODATE, -0.000001, opts), '-0.000001').toThrow();
  expect(format(ISODATE, 0, opts), '0').toBe('1899-12-30');

  expect(() => format(ISODATE, 2958465.99999422, opts), '2958465.99999422').toThrow();
  expect(format(ISODATE, 2958465.99999421, opts), '2958465.99999421').toBe('9999-12-31');

  const dt = 'yyyy-mm-dd/hh:mm:ss';
  expect(() => format(dt, 2958465.99999422, opts), '2958465.99999422').toThrow();
  expect(format(dt, 2958465.99999421, opts), '2958465.99999421').toBe('9999-12-31/23:59:59');

  const dt0 = 'yyyy-mm-dd/hh:mm:ss.0';
  expect(() => format(dt0, 2958465.99999943, opts), '2958465.99999943').toThrow();
  expect(format(dt0, 2958465.99999942, opts), '2958465.99999942').toBe('9999-12-31/23:59:59.9');

  const dt00 = ISODATE + '/hh:mm:ss.00';
  expect(() => format(dt00, 2958465.99999995, opts), '2958465.99999995').toThrow();
  expect(format(dt00, 2958465.99999994, opts), '2958465.99999994').toBe('9999-12-31/23:59:59.99');

  const dt000 = ISODATE + '/hh:mm:ss.000';
  // Excel can't really represent 2958465.999999995 so this never happens, but:
  expect(() => format(dt000, 2958465.999999995, opts), '2958465.99999999').toThrow();
  expect(format(dt000, 2958465.99999999, opts), '2958465.99999999').toBe('9999-12-31/23:59:59.999');
});

test('dateSpanLarge: ON', () => {
  expect(format(ISODATETIME, 0.1, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-30T02:24:00');
  expect(format(ISODATETIME, -0.00001157407, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T23:59:59');
  expect(format(ISODATETIME, 0, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-30T00:00:00');
  expect(format(ISODATETIME, -0.1, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T21:36:00');

  expect(format('[s]', -0.1, { leap1900: false, dateSpanLarge: true })).toBe('-8640');
  expect(format('[m]', -0.1, { leap1900: false, dateSpanLarge: true })).toBe('-144');
  expect(format('[h]', -0.1, { leap1900: false, dateSpanLarge: true })).toBe('-2');
  expect(format('[s]', -2, { leap1900: false, dateSpanLarge: true })).toBe('-172800');
  expect(format('[m]', -2, { leap1900: false, dateSpanLarge: true })).toBe('-2880');
  expect(format('[h]', -2, { leap1900: false, dateSpanLarge: true })).toBe('-48');

  expect(format(ISODATETIME, -0.2, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T19:12:00');
  expect(format(ISODATETIME, -0.3, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T16:48:00');
  expect(format(ISODATETIME, -0.4, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T14:24:00');
  expect(format(ISODATETIME, -0.5, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T12:00:00');
  expect(format(ISODATETIME, -0.6, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T09:36:00');
  expect(format(ISODATETIME, -0.7, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T07:12:00');
  expect(format(ISODATETIME, -0.8, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T04:48:00');
  expect(format(ISODATETIME, -0.9, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T02:24:00');
  expect(format(ISODATETIME, -1, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-29T00:00:00');
  expect(format(ISODATETIME, -1.1, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T21:36:00');
  expect(format(ISODATETIME, -1.2, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T19:12:00');
  expect(format(ISODATETIME, -1.3, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T16:48:00');
  expect(format(ISODATETIME, -1.4, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T14:24:00');
  expect(format(ISODATETIME, -1.5, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T12:00:00');
  expect(format(ISODATETIME, -1.6, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T09:36:00');
  expect(format(ISODATETIME, -1.7, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T07:12:00');
  expect(format(ISODATETIME, -1.8, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T04:48:00');
  expect(format(ISODATETIME, -1.9, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T02:24:00');
  expect(format(ISODATETIME, -2, { leap1900: false, dateSpanLarge: true })).toBe('1899-12-28T00:00:00');

  // negative dates should not be affected by the leap year bug
  expect(format(ISODATETIME, -0.2, { dateSpanLarge: true })).toBe('1899-12-29T19:12:00');
  expect(format(ISODATETIME, -0.3, { dateSpanLarge: true })).toBe('1899-12-29T16:48:00');
  expect(format(ISODATETIME, -0.4, { dateSpanLarge: true })).toBe('1899-12-29T14:24:00');
  expect(format(ISODATETIME, -0.5, { dateSpanLarge: true })).toBe('1899-12-29T12:00:00');
  expect(format(ISODATETIME, -0.6, { dateSpanLarge: true })).toBe('1899-12-29T09:36:00');
  expect(format(ISODATETIME, -0.7, { dateSpanLarge: true })).toBe('1899-12-29T07:12:00');
  expect(format(ISODATETIME, -0.8, { dateSpanLarge: true })).toBe('1899-12-29T04:48:00');
  expect(format(ISODATETIME, -0.9, { dateSpanLarge: true })).toBe('1899-12-29T02:24:00');
  expect(format(ISODATETIME, -1, { dateSpanLarge: true })).toBe('1899-12-29T00:00:00');
  expect(format(ISODATETIME, -1.1, { dateSpanLarge: true })).toBe('1899-12-28T21:36:00');
  expect(format(ISODATETIME, -1.2, { dateSpanLarge: true })).toBe('1899-12-28T19:12:00');
  expect(format(ISODATETIME, -1.3, { dateSpanLarge: true })).toBe('1899-12-28T16:48:00');
  expect(format(ISODATETIME, -1.4, { dateSpanLarge: true })).toBe('1899-12-28T14:24:00');
  expect(format(ISODATETIME, -1.5, { dateSpanLarge: true })).toBe('1899-12-28T12:00:00');
  expect(format(ISODATETIME, -1.6, { dateSpanLarge: true })).toBe('1899-12-28T09:36:00');
  expect(format(ISODATETIME, -1.7, { dateSpanLarge: true })).toBe('1899-12-28T07:12:00');
  expect(format(ISODATETIME, -1.8, { dateSpanLarge: true })).toBe('1899-12-28T04:48:00');
  expect(format(ISODATETIME, -1.9, { dateSpanLarge: true })).toBe('1899-12-28T02:24:00');
  expect(format(ISODATETIME, -2, { dateSpanLarge: true })).toBe('1899-12-28T00:00:00');

  expect(format(ISODATE, -45000, { leap1900: false, dateSpanLarge: true })).toBe('1776-10-15');
  expect(format(ISODATE, 35830289, { leap1900: false, dateSpanLarge: true })).toBe('99999-12-30');
  expect(format(ISODATE, 35830290, { leap1900: false, dateSpanLarge: true })).toBe('99999-12-31');
  expect(format(ISODATETIME, 35830290.9, { leap1900: false, dateSpanLarge: true })).toBe('99999-12-31T21:36:00');
  // out of bounds
  expect(format(ISODATETIME, 35830291, { leap1900: false, dateSpanLarge: true, dateErrorNumber: false })).toBe('######');
  expect(format(ISODATETIME, 35830291, { leap1900: false, dateSpanLarge: true, dateErrorNumber: true })).toBe('35830291');

  // Google Sheets emits "00-1-01-02" for TEXT(-694324, ISODATE)
  // this is does not seem all that useful to anyone
  expect(format(ISODATE, -694323, { leap1900: false, dateSpanLarge: true, dateErrorNumber: false })).toBe('-0001-01-02');
  expect(format(ISODATE, -694324, { leap1900: false, dateSpanLarge: true, dateErrorNumber: false })).toBe('-0001-01-01');
  expect(format(ISODATETIME, -694324.1, { leap1900: false, dateSpanLarge: true, dateErrorNumber: false })).toBe('######');
  expect(format(ISODATETIME, -694324.1, { leap1900: false, dateSpanLarge: true, dateErrorNumber: true })).toBe('-694324.1');
});

test('Excel leap 1900 bug: ON', () => {
  expect(format(ISODATE, 61, { leap1900: true })).toBe('1900-03-01');
  expect(format(ISODATE, 60, { leap1900: true })).toBe('1900-02-29');
  expect(format(ISODATE, 59, { leap1900: true })).toBe('1900-02-28');
  expect(format(ISODATE, 58, { leap1900: true })).toBe('1900-02-27');
  expect(format(ISODATE, 57, { leap1900: true })).toBe('1900-02-26');
  expect(format(ISODATE, 56, { leap1900: true })).toBe('1900-02-25');
  expect(format(ISODATE, 55, { leap1900: true })).toBe('1900-02-24');
  expect(format(ISODATE, 54, { leap1900: true })).toBe('1900-02-23');
  expect(format(ISODATE, 53, { leap1900: true })).toBe('1900-02-22');
  expect(format(ISODATE, 52, { leap1900: true })).toBe('1900-02-21');
  expect(format(ISODATE, 51, { leap1900: true })).toBe('1900-02-20');
  expect(format(ISODATE, 50, { leap1900: true })).toBe('1900-02-19');
  expect(format(ISODATE, 49, { leap1900: true })).toBe('1900-02-18');
  expect(format(ISODATE, 48, { leap1900: true })).toBe('1900-02-17');
  expect(format(ISODATE, 47, { leap1900: true })).toBe('1900-02-16');
  expect(format(ISODATE, 46, { leap1900: true })).toBe('1900-02-15');
  expect(format(ISODATE, 45, { leap1900: true })).toBe('1900-02-14');
  expect(format(ISODATE, 44, { leap1900: true })).toBe('1900-02-13');
  expect(format(ISODATE, 43, { leap1900: true })).toBe('1900-02-12');
  expect(format(ISODATE, 42, { leap1900: true })).toBe('1900-02-11');
  expect(format(ISODATE, 41, { leap1900: true })).toBe('1900-02-10');
  expect(format(ISODATE, 40, { leap1900: true })).toBe('1900-02-09');
  expect(format(ISODATE, 39, { leap1900: true })).toBe('1900-02-08');
  expect(format(ISODATE, 38, { leap1900: true })).toBe('1900-02-07');
  expect(format(ISODATE, 37, { leap1900: true })).toBe('1900-02-06');
  expect(format(ISODATE, 36, { leap1900: true })).toBe('1900-02-05');
  expect(format(ISODATE, 35, { leap1900: true })).toBe('1900-02-04');
  expect(format(ISODATE, 34, { leap1900: true })).toBe('1900-02-03');
  expect(format(ISODATE, 33, { leap1900: true })).toBe('1900-02-02');
  expect(format(ISODATE, 32, { leap1900: true })).toBe('1900-02-01');
  expect(format(ISODATE, 31, { leap1900: true })).toBe('1900-01-31');
  expect(format(ISODATE, 30, { leap1900: true })).toBe('1900-01-30');
  expect(format(ISODATE, 29, { leap1900: true })).toBe('1900-01-29');
  expect(format(ISODATE, 28, { leap1900: true })).toBe('1900-01-28');
  expect(format(ISODATE, 27, { leap1900: true })).toBe('1900-01-27');
  expect(format(ISODATE, 26, { leap1900: true })).toBe('1900-01-26');
  expect(format(ISODATE, 25, { leap1900: true })).toBe('1900-01-25');
  expect(format(ISODATE, 24, { leap1900: true })).toBe('1900-01-24');
  expect(format(ISODATE, 23, { leap1900: true })).toBe('1900-01-23');
  expect(format(ISODATE, 22, { leap1900: true })).toBe('1900-01-22');
  expect(format(ISODATE, 21, { leap1900: true })).toBe('1900-01-21');
  expect(format(ISODATE, 20, { leap1900: true })).toBe('1900-01-20');
  expect(format(ISODATE, 19, { leap1900: true })).toBe('1900-01-19');
  expect(format(ISODATE, 18, { leap1900: true })).toBe('1900-01-18');
  expect(format(ISODATE, 17, { leap1900: true })).toBe('1900-01-17');
  expect(format(ISODATE, 16, { leap1900: true })).toBe('1900-01-16');
  expect(format(ISODATE, 15, { leap1900: true })).toBe('1900-01-15');
  expect(format(ISODATE, 14, { leap1900: true })).toBe('1900-01-14');
  expect(format(ISODATE, 13, { leap1900: true })).toBe('1900-01-13');
  expect(format(ISODATE, 12, { leap1900: true })).toBe('1900-01-12');
  expect(format(ISODATE, 11, { leap1900: true })).toBe('1900-01-11');
  expect(format(ISODATE, 10, { leap1900: true })).toBe('1900-01-10');
  expect(format(ISODATE, 9, { leap1900: true })).toBe('1900-01-09');
  expect(format(ISODATE, 8, { leap1900: true })).toBe('1900-01-08');
  expect(format(ISODATE, 7, { leap1900: true })).toBe('1900-01-07');
  expect(format(ISODATE, 6, { leap1900: true })).toBe('1900-01-06');
  expect(format(ISODATE, 5, { leap1900: true })).toBe('1900-01-05');
  expect(format(ISODATE, 4, { leap1900: true })).toBe('1900-01-04');
  expect(format(ISODATE, 3, { leap1900: true })).toBe('1900-01-03');
  expect(format(ISODATE, 2, { leap1900: true })).toBe('1900-01-02');
  expect(format(ISODATE, 1, { leap1900: true })).toBe('1900-01-01');
  expect(format(ISODATE, 0, { leap1900: true })).toBe('1900-01-00');
});

test('Excel 1900 bug: OFF', () => {
  expect(format(ISODATE, 61, { leap1900: false })).toBe('1900-03-01');
  expect(format(ISODATE, 60, { leap1900: false })).toBe('1900-02-28');
  expect(format(ISODATE, 59, { leap1900: false })).toBe('1900-02-27');
  expect(format(ISODATE, 58, { leap1900: false })).toBe('1900-02-26');
  expect(format(ISODATE, 57, { leap1900: false })).toBe('1900-02-25');
  expect(format(ISODATE, 56, { leap1900: false })).toBe('1900-02-24');
  expect(format(ISODATE, 55, { leap1900: false })).toBe('1900-02-23');
  expect(format(ISODATE, 54, { leap1900: false })).toBe('1900-02-22');
  expect(format(ISODATE, 53, { leap1900: false })).toBe('1900-02-21');
  expect(format(ISODATE, 52, { leap1900: false })).toBe('1900-02-20');
  expect(format(ISODATE, 51, { leap1900: false })).toBe('1900-02-19');
  expect(format(ISODATE, 50, { leap1900: false })).toBe('1900-02-18');
  expect(format(ISODATE, 49, { leap1900: false })).toBe('1900-02-17');
  expect(format(ISODATE, 48, { leap1900: false })).toBe('1900-02-16');
  expect(format(ISODATE, 47, { leap1900: false })).toBe('1900-02-15');
  expect(format(ISODATE, 46, { leap1900: false })).toBe('1900-02-14');
  expect(format(ISODATE, 45, { leap1900: false })).toBe('1900-02-13');
  expect(format(ISODATE, 44, { leap1900: false })).toBe('1900-02-12');
  expect(format(ISODATE, 43, { leap1900: false })).toBe('1900-02-11');
  expect(format(ISODATE, 42, { leap1900: false })).toBe('1900-02-10');
  expect(format(ISODATE, 41, { leap1900: false })).toBe('1900-02-09');
  expect(format(ISODATE, 40, { leap1900: false })).toBe('1900-02-08');
  expect(format(ISODATE, 39, { leap1900: false })).toBe('1900-02-07');
  expect(format(ISODATE, 38, { leap1900: false })).toBe('1900-02-06');
  expect(format(ISODATE, 37, { leap1900: false })).toBe('1900-02-05');
  expect(format(ISODATE, 36, { leap1900: false })).toBe('1900-02-04');
  expect(format(ISODATE, 35, { leap1900: false })).toBe('1900-02-03');
  expect(format(ISODATE, 34, { leap1900: false })).toBe('1900-02-02');
  expect(format(ISODATE, 33, { leap1900: false })).toBe('1900-02-01');
  expect(format(ISODATE, 32, { leap1900: false })).toBe('1900-01-31');
  expect(format(ISODATE, 31, { leap1900: false })).toBe('1900-01-30');
  expect(format(ISODATE, 30, { leap1900: false })).toBe('1900-01-29');
  expect(format(ISODATE, 29, { leap1900: false })).toBe('1900-01-28');
  expect(format(ISODATE, 28, { leap1900: false })).toBe('1900-01-27');
  expect(format(ISODATE, 27, { leap1900: false })).toBe('1900-01-26');
  expect(format(ISODATE, 26, { leap1900: false })).toBe('1900-01-25');
  expect(format(ISODATE, 25, { leap1900: false })).toBe('1900-01-24');
  expect(format(ISODATE, 24, { leap1900: false })).toBe('1900-01-23');
  expect(format(ISODATE, 23, { leap1900: false })).toBe('1900-01-22');
  expect(format(ISODATE, 22, { leap1900: false })).toBe('1900-01-21');
  expect(format(ISODATE, 21, { leap1900: false })).toBe('1900-01-20');
  expect(format(ISODATE, 20, { leap1900: false })).toBe('1900-01-19');
  expect(format(ISODATE, 19, { leap1900: false })).toBe('1900-01-18');
  expect(format(ISODATE, 18, { leap1900: false })).toBe('1900-01-17');
  expect(format(ISODATE, 17, { leap1900: false })).toBe('1900-01-16');
  expect(format(ISODATE, 16, { leap1900: false })).toBe('1900-01-15');
  expect(format(ISODATE, 15, { leap1900: false })).toBe('1900-01-14');
  expect(format(ISODATE, 14, { leap1900: false })).toBe('1900-01-13');
  expect(format(ISODATE, 13, { leap1900: false })).toBe('1900-01-12');
  expect(format(ISODATE, 12, { leap1900: false })).toBe('1900-01-11');
  expect(format(ISODATE, 11, { leap1900: false })).toBe('1900-01-10');
  expect(format(ISODATE, 10, { leap1900: false })).toBe('1900-01-09');
  expect(format(ISODATE, 9, { leap1900: false })).toBe('1900-01-08');
  expect(format(ISODATE, 8, { leap1900: false })).toBe('1900-01-07');
  expect(format(ISODATE, 7, { leap1900: false })).toBe('1900-01-06');
  expect(format(ISODATE, 6, { leap1900: false })).toBe('1900-01-05');
  expect(format(ISODATE, 5, { leap1900: false })).toBe('1900-01-04');
  expect(format(ISODATE, 4, { leap1900: false })).toBe('1900-01-03');
  expect(format(ISODATE, 3, { leap1900: false })).toBe('1900-01-02');
  expect(format(ISODATE, 2, { leap1900: false })).toBe('1900-01-01');
  expect(format(ISODATE, 1, { leap1900: false })).toBe('1899-12-31');
  expect(format(ISODATE, 0, { leap1900: false })).toBe('1899-12-30');
});
