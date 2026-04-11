import { test, expect } from 'vitest';
import { assertFormat, assertFormatInvalid } from './utils.ts';

test('Correct handling of the comma operator', () => {
  expect.assertions(33);

  assertFormat('0,', 1234567.89, '1235');
  assertFormat('0,,', 1234567.89, '1');
  assertFormat('0,,,', 1234567.89, '0');
  assertFormat('0,0', 1234567.89, '1,234,568');
  assertFormat('0,00', 1234567.89, '1,234,568');
  assertFormat('0,000', 1234567.89, '1,234,568');
  assertFormat('0,0,0', 1234567.89, '1,234,568');
  assertFormat('0,,0', 1234567.89, '1,234,568');
  assertFormat('0,,,0', 1234567.89, '1,234,568');
  assertFormat('0,x', 1234567.89, '1235x');
  assertFormat('0,x,', 1234567.89, '1235x,');
  assertFormat('0x,', 1234567.89, '1234568x,');
  assertFormat('0,,x', 1234567.89, '1x');
  assertFormat('0,x0', 1234567.89, '123456x8');
  assertFormat('0 , 0', 1234567.89, '123456 , 8');
  assertFormat('0, ,0', 1234567.89, '123456 ,8');
  assertFormat('0.,', 1234567.89, '1235.');
  assertFormat('0.0,', 1234567.89, '1234.6');
  assertFormat('0.0,0', 1234567.89, '1234567.89');
  assertFormat('0,0 0/0', 1234567.89, '1,234,567 8/9');
  assertFormat('0,0,,0', 1234567.89, '1,234,568');
  assertFormat('0.0,0,', 1234567.89, '1234.57');
  assertFormat('0.0 , 0 ,', 1234567.89, '1234567.8 , 9 ,');
  assertFormat('0 ,', 1234567.89, '1234568 ,');
  assertFormat('0x,', 1234567.89, '1234568x,');
  assertFormat('0 ,', 1234567.89, '1234568 ,');
  assertFormat('0 ,,', 1234567.89, '1234568 ,');
  assertFormat('0x,', 1234567.89, '1234568x,');
  assertFormat('x,0', 1234567.89, 'x,1234568');

  // Still unsolved by the formatter: digit interplay with 0#?
  assertFormat('01,', 1234567.89, '12351');
  assertFormat('09,', 1234567.89, '12359');
  // assertFormat('01,0', 1234567.89, '1,234,5618');
  // assertFormat('09,0', 1234567.89, '1,234,5698');
  // assertFormat('0, 9', 1234567.89, '1234568 9');

  assertFormatInvalid('0,0/0');
  assertFormatInvalid('0/0,0');
  // assertFormatInvalid('0 0/0,'); "1234 4/7" gets emitted, same as Sheets
});
