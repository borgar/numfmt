import test from './utils.ts';

test('SSF table: tables/cal-updated.tsv', t => {
  t.runTable('tables/cal-updated.tsv');
  t.end();
});
