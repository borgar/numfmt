import { describe } from 'vitest';
import { runTable } from './utils.ts';

// -- running the full table takes a while
const FULL = false;

describe.skipIf(process.env.SKIPTABLES)('SSF table: tables/ssf-times.tsv', () => {
  runTable(
    FULL
      ? 'tables/ssf-times-full.tsv'
      : 'tables/ssf-times.tsv'
  );
});
