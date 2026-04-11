import { expect, test } from 'vitest';
import { assertFormat } from './utils.ts';

test('bigint', () => {
  expect.assertions(14);

  assertFormat('0', Number.MAX_SAFE_INTEGER, String(Number.MAX_SAFE_INTEGER));
  assertFormat('0', 10n, '10');

  assertFormat('General', 10n, '10');
  assertFormat('General', 9007199254740991n, '9.0072E+15');

  assertFormat('0.0', 9007199254740991n, '9007199254740990.0');

  assertFormat('#,##0.0', 9007199254740991n, '9,007,199,254,740,990.0');
  assertFormat('#,##0.0', 9007199254750000n, '######');
  assertFormat('#,##0.0', -9007199254750000n, '######');

  assertFormat('#0-000-00', 9007199254750000n, '######');
  assertFormat('0%', 9007199254750000n, '######');

  assertFormat('#0-000-00', 9007199254750000n, '9007199254750000', { bigintErrorNumber: true });
  assertFormat('0%', 9007199254750000n, '9007199254750000', { bigintErrorNumber: true });

  // preferably we should support bigint throughout:
  // assertFormat('#0-000-00', 9007199254750000n, '90071992547-500-00');
  // assertFormat('0%', 9007199254750000n, '900719925475000000%');

  assertFormat('0.000E+00', 999990000, '1.000E+09');
  assertFormat('0.000E+00', 999990000n, '1.000E+09');
});
