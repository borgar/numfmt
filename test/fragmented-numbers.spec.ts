import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

test('Fragmented number parts', () => {
  // exps with fragments
  expect(format('0.00E+0x0', 123456789)).toBe('1.23E+0x8');
  expect(format('0.00E+0x0', 123456789)).toBe('1.23E+0x8');
  expect(format('0.00E+?x?', 123456789)).toBe('1.23E+ x8');
  expect(format('0.00E+#x#', 123456789)).toBe('1.23E+x8');
  expect(format('0.0x0E+0', 123456789)).toBe('1.2x3E+8');
  expect(format('0x0.00E+0', 123456789)).toBe('0x1.23E+8');
  expect(format('0x0.0x0E+0x0', 1)).toBe('0x1.0x0E+0x0');
  expect(format('#x#.#x#E+#x#', 1)).toBe('x1.xE+x0');
  expect(format('?x?.?x?E+?x?', 1)).toBe(' x1. x E+ x0');

  expect(format('00 00/00', 1)).toBe('01 00/01');
  expect(format('00x00/00', 12345.67)).toBe('12345x65/97');
  expect(format('0z0 00/00', 12345.67)).toBe('1234z5 65/97');
  expect(format('00 0z0/00', 12345.67)).toBe('1234 5z65/97');
  expect(format('00 00/0z0', 12345.67)).toBe('12345 02/3z0');
  expect(format('00 0/0', 12345.67)).toBe('12345 2/3');
  expect(format('00 ??/?z?', 12345.67)).toBe('12345  2/3z ');

  expect(format('000E+00', 12345.67)).toBe('012E+03');
  expect(format('00x0E+00', 12345.67)).toBe('01x2E+03');
  expect(format('000E+0x0', 12345.67)).toBe('012E+0x3');
  expect(format('0.0E+0x00', 1234567890000)).toBe('1.2E+0x12');
});
