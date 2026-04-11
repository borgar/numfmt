import { test, expect } from 'vitest';
import { assertFormat } from './utils.ts';

test('Fragmented number parts', () => {
  expect.assertions(20);
  // exps with fragments
  assertFormat('0.00E+0x0', 123456789, '1.23E+0x8');
  assertFormat('0.00E+0x0', 123456789, '1.23E+0x8');
  assertFormat('0.00E+?x?', 123456789, '1.23E+ x8');
  assertFormat('0.00E+#x#', 123456789, '1.23E+x8');
  assertFormat('0.0x0E+0', 123456789, '1.2x3E+8');
  assertFormat('0x0.00E+0', 123456789, '0x1.23E+8');
  assertFormat('0x0.0x0E+0x0', 1, '0x1.0x0E+0x0');
  assertFormat('#x#.#x#E+#x#', 1, 'x1.xE+x0');
  assertFormat('?x?.?x?E+?x?', 1, ' x1. x E+ x0');

  assertFormat('00 00/00', 1, '01 00/01');
  assertFormat('00x00/00', 12345.67, '12345x65/97');
  assertFormat('0z0 00/00', 12345.67, '1234z5 65/97');
  assertFormat('00 0z0/00', 12345.67, '1234 5z65/97');
  assertFormat('00 00/0z0', 12345.67, '12345 02/3z0');
  assertFormat('00 0/0', 12345.67, '12345 2/3');
  assertFormat('00 ??/?z?', 12345.67, '12345  2/3z ');

  assertFormat('000E+00', 12345.67, '012E+03');
  assertFormat('00x0E+00', 12345.67, '01x2E+03');
  assertFormat('000E+0x0', 12345.67, '012E+0x3');
  assertFormat('0.0E+0x00', 1234567890000, '1.2E+0x12');
});
