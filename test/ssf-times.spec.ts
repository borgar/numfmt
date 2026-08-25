import test from './utils.js';

// -- running the full table takes a while
const FULL = false;

test('SSF table: tables/ssf-times.tsv', t => {
  t.runTable(
    FULL
      ? 'tables/ssf-times-full.tsv'
      : 'tables/ssf-times.tsv'
  );
  t.end();
});
