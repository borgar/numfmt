import { expect, test } from 'vitest';
import { format, formatColor, isDateFormat } from '../lib/index.ts';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('Robust mode', () => {
  expect(format('dddd, dd. mmmm yyy', -1, excelOpts)).toBe('######');

  // these things should throw
  expect(() => format('a;b;c;d;', 0, excelOpts), 'a;b;c;d;').toThrow();
  expect(() => format('y 0', 0, excelOpts), 'y 0').toThrow();

  // ...but not in robust mode
  const opts = { locale: 'en', throws: false, ...excelOpts };
  expect(format('a;b;c;d;', 0, opts), 'format does not throw with "a;b;c;d;"').toBe('######');
  expect(format('y 0', 1, opts), 'format does not throw with "y 0"').toBe('######');
  expect(format('dddd, dd. mmmm yyy', -1, opts), 'format does not throw with "dddd, dd. mmmm yyy"').toBe('######');
  expect(format('y 0', 1, opts), 'format does not throw with "dddd, dd. mmmm yyy"').toBe('######');

  expect(formatColor('a;b;c;d;', 0, opts), 'formatColor does not throw').toBe(undefined);
  expect(isDateFormat('a;b;c;d;'), 'isDateFormat does not throw').toBe(false);
});
