import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

test('Correct handling of the comma operator', () => {
  expect(format('0,', 1234567.89)).toBe('1235');
  expect(format('0,,', 1234567.89)).toBe('1');
  expect(format('0,,,', 1234567.89)).toBe('0');
  expect(format('0,0', 1234567.89)).toBe('1,234,568');
  expect(format('0,00', 1234567.89)).toBe('1,234,568');
  expect(format('0,000', 1234567.89)).toBe('1,234,568');
  expect(format('0,0,0', 1234567.89)).toBe('1,234,568');
  expect(format('0,,0', 1234567.89)).toBe('1,234,568');
  expect(format('0,,,0', 1234567.89)).toBe('1,234,568');
  expect(format('0,x', 1234567.89)).toBe('1235x');
  expect(format('0,x,', 1234567.89)).toBe('1235x,');
  expect(format('0x,', 1234567.89)).toBe('1234568x,');
  expect(format('0,,x', 1234567.89)).toBe('1x');
  expect(format('0,x0', 1234567.89)).toBe('123456x8');
  expect(format('0 , 0', 1234567.89)).toBe('123456 , 8');
  expect(format('0, ,0', 1234567.89)).toBe('123456 ,8');
  expect(format('0.,', 1234567.89)).toBe('1235.');
  expect(format('0.0,', 1234567.89)).toBe('1234.6');
  expect(format('0.0,0', 1234567.89)).toBe('1234567.89');
  expect(format('0,0 0/0', 1234567.89)).toBe('1,234,567 8/9');
  expect(format('0,0,,0', 1234567.89)).toBe('1,234,568');
  expect(format('0.0,0,', 1234567.89)).toBe('1234.57');
  expect(format('0.0 , 0 ,', 1234567.89)).toBe('1234567.8 , 9 ,');
  expect(format('0 ,', 1234567.89)).toBe('1234568 ,');
  expect(format('0x,', 1234567.89)).toBe('1234568x,');
  expect(format('0 ,', 1234567.89)).toBe('1234568 ,');
  expect(format('0 ,,', 1234567.89)).toBe('1234568 ,');
  expect(format('0x,', 1234567.89)).toBe('1234568x,');
  expect(format('x,0', 1234567.89)).toBe('x,1234568');

  // Still unsolved by the formatter: digit interplay with 0#?
  expect(format('01,', 1234567.89)).toBe('12351');
  expect(format('09,', 1234567.89)).toBe('12359');
  // expect(format('01,0', 1234567.89)).toBe('1,234,5618');
  // expect(format('09,0', 1234567.89)).toBe('1,234,5698');
  // expect(format('0, 9', 1234567.89)).toBe('1234568 9');

  expect(() => format('0,0/0', '')).toThrow();
  expect(() => format('0/0,0', '')).toThrow();
  // expect(() => format('0 0/0,', '')).toThrow(); // "1234 4/7" gets emitted, same as Sheets
});
