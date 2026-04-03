import test from './utils.ts';

test('SSF table: tables/ssf-dates.tsv', t => {
  t.runTable('tables/ssf-dates.tsv');
  t.end();
});
