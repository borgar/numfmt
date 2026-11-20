import { expect, test } from 'vitest';
import { format } from '../src/index.ts';

test('More fraction cases', () => {
  expect(() => format('0/', '')).toThrow();
  expect(() => format('/0', '')).toThrow();
  expect(() => format('/', '')).toThrow();

  expect(format('0/0', 0)).toBe('0/1');
  expect(format('0/0', 1)).toBe('1/1');
  expect(format('0/0', 123)).toBe('123/1');
  expect(format('0/0', 12.345)).toBe('37/3');
  expect(format('0 0/0', 0)).toBe('0 0/1');
  expect(format('0 0/0', 1)).toBe('1 0/1');
  expect(format('0 0/0', 123)).toBe('123 0/1');
  expect(format('0 0/0', 12.345)).toBe('12 1/3');

  expect(format('?/?', 0)).toBe('0/1');
  expect(format('?/?', 1)).toBe('1/1');
  expect(format('?/?', 123)).toBe('123/1');
  expect(format('?/?', 12.345)).toBe('37/3');
  expect(format('? ?/?', 0)).toBe('0    ');
  expect(format('? ?/?', 1)).toBe('1    ');
  expect(format('? ?/?', 123)).toBe('123    ');
  expect(format('? ?/?', 12.345)).toBe('12 1/3');

  expect(format('#/#', 0)).toBe('0/1');
  expect(format('#/#', 1)).toBe('1/1');
  expect(format('#/#', 123)).toBe('123/1');
  expect(format('#/#', 12.345)).toBe('37/3');
  expect(format('# #/#', 0)).toBe('0');
  expect(format('# #/#', 1)).toBe('1');
  expect(format('# #/#', 123)).toBe('123');
  expect(format('# #/#', 12.345)).toBe('12 1/3');
});

test('Improper fractions close to a whole number', () => {
  // the best fraction is the whole number over 1, not 0/1
  expect(format('?/?', 1.05)).toBe('1/1');
  expect(format('?/?', 2.01)).toBe('2/1');
  expect(format('?/?', -1.05)).toBe('-1/1');
  expect(format('0/0', 10.05)).toBe('10/1');
  expect(format('??/??', 2.001)).toBe(' 2/1 ');
  // a small value still reads as 0/1
  expect(format('?/?', 0.05)).toBe('0/1');
  expect(format('?/?', 0.95)).toBe('1/1');
});
