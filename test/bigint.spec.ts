import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

test('bigint', () => {
  expect(format('0', Number.MAX_SAFE_INTEGER)).toBe(String(Number.MAX_SAFE_INTEGER));
  expect(format('0', 10n)).toBe('10');

  expect(format('General', 10n)).toBe('10');
  expect(format('General', 9007199254740991n)).toBe('9.0072E+15');

  expect(format('0.0', 9007199254740991n)).toBe('9007199254740990.0');

  expect(format('#,##0.0', 9007199254740991n)).toBe('9,007,199,254,740,990.0');
  expect(format('#,##0.0', 9007199254750000n)).toBe('######');
  expect(format('#,##0.0', -9007199254750000n)).toBe('######');

  expect(format('#0-000-00', 9007199254750000n)).toBe('######');
  expect(format('0%', 9007199254750000n)).toBe('######');

  expect(format('#0-000-00', 9007199254750000n, { bigintErrorNumber: true })).toBe('9007199254750000');
  expect(format('0%', 9007199254750000n, { bigintErrorNumber: true })).toBe('9007199254750000');

  // preferably we should support bigint throughout:
  // expect(format('#0-000-00', 9007199254750000n)).toBe('90071992547-500-00');
  // expect(format('0%', 9007199254750000n)).toBe('900719925475000000%');

  expect(format('0.000E+00', 999990000)).toBe('1.000E+09');
  expect(format('0.000E+00', 999990000n)).toBe('1.000E+09');
});
