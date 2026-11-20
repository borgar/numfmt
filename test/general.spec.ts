import { expect, test } from 'vitest';
import { format } from '../src/index.ts';

test('General format', () => {
  expect(format('General', undefined)).toBe('');
  expect(format('General', null)).toBe('');
});

test('No decimal point', () => {
  expect(format('General', 0.9999999999999999)).toBe('1');
  expect(format('General', 0.999999999999999)).toBe('1');
  expect(format('General', 0.99999999999999)).toBe('1');
  expect(format('General', 0.9999999999999)).toBe('1');
  expect(format('General', 0.999999999999)).toBe('1');
  expect(format('General', 0.99999999999)).toBe('1');
  expect(format('General', 0.9999999999)).toBe('1'); // Sheets emits "0.9999999999" here which is not by spec
  expect(format('General', 0.999999999)).toBe('0.999999999'); // Excel yeilds a "1" here, but this is not by spec
  expect(format('General', 0.99999999)).toBe('0.99999999');
  expect(format('General', 0.9999999)).toBe('0.9999999');
  expect(format('General', 0.999999)).toBe('0.999999');
});

test('General scientific notation digits match Excel (#105)', () => {
  expect(format('General', 1.23456789E+98)).toBe('1.23457E+98');
  expect(format('General', 1.23456789E+99)).toBe('1.2346E+99');
  expect(format('General', 1.23456789E+307)).toBe('1.2346E+307');
  expect(format('General', 1.23456789E-200)).toBe('1.2346E-200');
  expect(format('General', 9.999994E+200)).toBe('1E+201');
  expect(format('General', 9.999994E-99)).toBe('1E-98');
});

test('General: mantissa carry from rounding bumps the exponent (#105)', () => {
  expect(format('General', 999999999999997)).toBe('1E+15');
  expect(format('General', -999999999999997)).toBe('-1E+15');
  expect(format('General', 999999500000001)).toBe('1E+15');
  expect(format('General', 99999999999999.7)).toBe('1E+14');
  expect(format('General', 9.9999999999997E-11)).toBe('1E-10');
  expect(format('General', 999999999999999)).toBe('1E+15');
});
