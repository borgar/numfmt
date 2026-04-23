import { test, expect } from 'vitest';
import { format, formatColor, isDateFormat } from '../lib/index.ts';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('Robust mode', () => {
  expect.assertions(9);
  expect(format('dddd, dd. mmmm yyy', -1, excelOpts)).toBe('######');

  // these things should throw
  expect(() => format('a;b;c;d;', 0, excelOpts)).toThrow();
  expect(() => format('y 0', 0, excelOpts)).toThrow();

  // ...but not in robust mode
  const opts = { locale: 'en', throws: false, ...excelOpts };
  expect(format('a;b;c;d;', 0, opts)).toBe('######');
  expect(format('y 0', 1, opts)).toBe('######');
  expect(format('dddd, dd. mmmm yyy', -1, opts)).toBe('######');
  expect(format('y 0', 1, opts)).toBe('######');

  expect(formatColor('a;b;c;d;', 0, opts)).toBe(null);
  expect(isDateFormat('a;b;c;d;')).toBe(false);
});
