import test from './utils.js';

test('bigint', t => {
  t.format('0', Number.MAX_SAFE_INTEGER, String(Number.MAX_SAFE_INTEGER));
  t.format('0', 10n, '10');

  t.format('General', 10n, '10');
  t.format('General', 9007199254740991n, '9.0072E+15');

  t.format('0.0', 9007199254740991n, '9007199254740990.0');

  t.format('#,##0.0', 9007199254740991n, '9,007,199,254,740,990.0');
  t.format('#,##0.0', 9007199254750000n, '######');
  t.format('#,##0.0', -9007199254750000n, '######');

  t.format('#0-000-00', 9007199254750000n, '######');
  t.format('0%', 9007199254750000n, '######');

  t.format('#0-000-00', 9007199254750000n, '9007199254750000', { bigintErrorNumber: true });
  t.format('0%', 9007199254750000n, '9007199254750000', { bigintErrorNumber: true });

  // preferably we should support bigint throughout:
  // t.format('#0-000-00', 9007199254750000n, '90071992547-500-00');
  // t.format('0%', 9007199254750000n, '900719925475000000%');

  t.format('0.000E+00', 999990000, '1.000E+09');
  t.format('0.000E+00', 999990000n, '1.000E+09');

  t.end();
});
