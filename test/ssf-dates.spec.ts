import { describe } from 'vitest';
import { runTable } from './utils.ts';

describe.skipIf(process.env.SKIPTABLES)('SSF table: tables/ssf-dates.tsv', () => {
  runTable('tables/ssf-dates.tsv');
});
