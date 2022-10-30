import test from './utils.js';

test('SSF table: tables/ssf-dates.tsv', t => {
  t.runTable('tables/ssf-dates.tsv');
  t.end();
});
